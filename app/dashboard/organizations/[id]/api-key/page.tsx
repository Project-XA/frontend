"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { organizationService } from "@/services/organizationService";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Loader2, Key, AlertTriangle, ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";
import CodeTabs from "@/components/CodeTabs";

export default function GenerateApiKeyPage() {
    const params = useParams();
    const router = useRouter();
    const orgId = Number(params.id);

    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleGenerateValues = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await organizationService.generateApiKey(orgId);
            if (response.success && response.data) {
                setApiKey(response.data.apiKey);
            } else {
                setError(response.message || "Failed to generate API Key.");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Failed to generate API Key.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href={`/dashboard/organizations/${orgId}`} className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">Generate API Key</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Key className="h-5 w-5" /> API Key Generation
                    </CardTitle>
                    <CardDescription>
                        Generate a new API Key for this organization.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!apiKey ? (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>
                                Generating a new API Key will invalidate any existing keys.
                                The new key will only be shown once. Please make sure to copy and save it securely.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="space-y-2">
                            <Alert className="bg-green-50 text-green-900 border-green-200">
                                <Check className="h-4 w-4 text-green-600" />
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>
                                    API Key generated successfully. Please copy it below.
                                </AlertDescription>
                            </Alert>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
                                    {apiKey}
                                </code>
                                <Button onClick={copyToClipboard} size="icon" variant="outline" title="Copy to clipboard">
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                                This key will not be shown again. If you lose it, you will need to generate a new one.
                            </p>
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end">
                    {!apiKey ? (
                        <Button onClick={handleGenerateValues} disabled={loading} variant="destructive">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate API Key
                        </Button>
                    ) : (
                        <Link href={`/dashboard/organizations/${orgId}`}>
                            <Button variant="outline">Done</Button>
                        </Link>
                    )}
                </CardFooter>
            </Card>

            <div className="space-y-6">
                <h2 className="text-xl font-semibold tracking-tight">Developer Guide</h2>
                <p className="text-muted-foreground">
                    Use the generated API Key to integrate attendance data into your backend systems.
                </p>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Authentication</CardTitle>
                        <CardDescription>
                            All API requests must include the API Key in the <code>X-Api-Key</code> header.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted p-4 rounded-md font-mono text-sm">
                            X-Api-Key: YOUR_API_KEY
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Get Session Attendance</CardTitle>
                        <CardDescription>
                            Retrieves the list of attendees for a specific session.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                            <span className="font-semibold">URL:</span>
                            <span className="font-mono text-muted-foreground">/&#123;sessionId&#125;/attendance</span>
                            <span className="font-semibold">Method:</span>
                            <span className="font-mono text-muted-foreground">GET</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Get Session Attendance CSV</CardTitle>
                        <CardDescription>
                            Downloads a CSV file containing the attendance records for a specific session.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                            <span className="font-semibold">URL:</span>
                            <span className="font-mono text-muted-foreground">/session/&#123;sessionId&#125;/csv</span>
                            <span className="font-semibold">Method:</span>
                            <span className="font-mono text-muted-foreground">GET</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Get Session Attendance Examples</h3>
                    <CodeTabs
                        tabs={[
                            {
                                label: "Node.js (Axios)",
                                language: "javascript",
                                code: `const axios = require('axios');

async function getAttendance(sessionId, apiKey) {
  try {
    const response = await axios.get(\`https://api.attendo.com/\${sessionId}/attendance\`, {
      headers: {
        'X-Api-Key': apiKey
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getAttendance('session-123', 'YOUR_API_KEY');`
                            },
                            {
                                label: "Python (Requests)",
                                language: "python",
                                code: `import requests

def get_attendance(session_id, api_key):
    url = f"https://api.attendo.com/{session_id}/attendance"
    headers = {
        "X-Api-Key": api_key
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        print(response.json())
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")

get_attendance('session-123', 'YOUR_API_KEY')`
                            },
                            {
                                label: "C# (HttpClient)",
                                language: "csharp",
                                code: `using System.Net.Http.Headers;

public async Task GetAttendance(string sessionId, string apiKey)
{
    using (var client = new HttpClient())
    {
        client.DefaultRequestHeaders.Add("X-Api-Key", apiKey);
        
        try 
        {
            var response = await client.GetAsync($"https://api.attendo.com/{sessionId}/attendance");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            Console.WriteLine(content);
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Error: {e.Message}");
        }
    }
}`
                            },
                            {
                                label: "PHP (cURL)",
                                language: "php",
                                code: `<?php

$sessionId = 'session-123';
$apiKey = 'YOUR_API_KEY';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.attendo.com/$sessionId/attendance");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "X-Api-Key: $apiKey"
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);
?>`
                            },
                            {
                                label: "Java (OkHttp)",
                                language: "java",
                                code: `OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://api.attendo.com/session-123/attendance")
  .addHeader("X-Api-Key", "YOUR_API_KEY")
  .build();

try (Response response = client.newCall(request).execute()) {
  if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
  System.out.println(response.body().string());
}`
                            }
                        ]}
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Download Attendance CSV Examples</h3>
                    <CodeTabs
                        tabs={[
                            {
                                label: "Node.js (Axios)",
                                language: "javascript",
                                code: `const axios = require('axios');
const fs = require('fs');

async function downloadCsv(sessionId, apiKey) {
  try {
    const response = await axios.get(\`https://api.attendo.com/session/\${sessionId}/csv\`, {
      headers: { 'X-Api-Key': apiKey },
      responseType: 'stream'
    });
    
    response.data.pipe(fs.createWriteStream('attendance.csv'));
  } catch (error) {
    console.error(error);
  }
}

downloadCsv('session-123', 'YOUR_API_KEY');`
                            },
                            {
                                label: "Python (Requests)",
                                language: "python",
                                code: `import requests

def download_csv(session_id, api_key):
    url = f"https://api.attendo.com/session/{session_id}/csv"
    headers = { "X-Api-Key": api_key }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        with open('attendance.csv', 'wb') as f:
            f.write(response.content)
    except Exception as e:
        print(f"Error: {e}")

download_csv('session-123', 'YOUR_API_KEY')`
                            },
                            {
                                label: "C# (HttpClient)",
                                language: "csharp",
                                code: `using System.IO;
using System.Net.Http;

public async Task DownloadCsv(string sessionId, string apiKey)
{
    using (var client = new HttpClient())
    {
        client.DefaultRequestHeaders.Add("X-Api-Key", apiKey);
        
        var response = await client.GetAsync($"https://api.attendo.com/session/{sessionId}/csv");
        
        if (response.IsSuccessStatusCode) 
        {
            var content = await response.Content.ReadAsByteArrayAsync();
            File.WriteAllBytes("attendance.csv", content);
        }
    }
}`
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
