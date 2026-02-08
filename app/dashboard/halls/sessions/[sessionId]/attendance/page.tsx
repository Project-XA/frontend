"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { sessionService } from "@/services/sessionService";
import { AttendanceRecord, Session } from "@/types/session";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Loader2, ArrowLeft, Users, AlertCircle, CheckCircle, Fingerprint, FileDown } from "lucide-react";
import Link from "next/link";

export default function AttendancePage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = Number(params.sessionId);

  const [session, setSession] = useState<Session | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch session details
        const sessionResponse = await sessionService.getSessionById(sessionId);
        if (sessionResponse.success && sessionResponse.data) {
          setSession(sessionResponse.data);
        } else {
          setError("Session not found.");
          return;
        }

        // Fetch attendance records
        const attendanceResponse = await sessionService.getSessionAttendanceInternal(sessionId);
        if (attendanceResponse.success && attendanceResponse.data) {
          setAttendance(attendanceResponse.data);
        } else {
          setError(attendanceResponse.message || "Failed to load attendance.");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) fetchData();
  }, [sessionId]);

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const handleExportCsv = async () => {
    try {
      const blob = await sessionService.exportSessionAttendanceCsvInternal(sessionId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance-${sessionId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to export CSV", err);
      // Optional: Add toast notification for error
    }
  };

  const getMatchScoreColor = (score: number | null) => {
    if (score === null) return "text-muted-foreground";
    if (score >= 90) return "text-green-600 font-semibold";
    if (score >= 70) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="space-y-4">
        <Link href="/dashboard/halls">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Halls
          </Button>
        </Link>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "Session not found."}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/halls">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Halls
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-muted">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{session.sessionName}</h1>
              <p className="text-sm text-muted-foreground">
                {formatDateTime(session.startAt)} — {formatDateTime(session.endAt)}
              </p>
            </div>
          </div>
        </div>
        <Button onClick={handleExportCsv} variant="outline" disabled={attendance.length === 0}>
          <FileDown className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Attendance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> Session Attendance
          </CardTitle>
          <CardDescription>
            {attendance.length} {attendance.length === 1 ? 'attendee' : 'attendees'} recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          {attendance.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">No Attendance Records</h3>
              <p className="text-muted-foreground">
                No one has checked in to this session yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Username</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Check-in Time</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Verification</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Match Score</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record, index) => (
                    <tr key={`${record.userId}-${index}`} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium">{record.fullName}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{record.userName}</td>
                      <td className="py-3 px-4 text-sm">{formatDateTime(record.timeStamp)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${record.verificationType === "Face"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-purple-100 text-purple-800 border border-purple-200"
                            }`}
                        >
                          {record.verificationType === "Face" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Fingerprint className="h-3 w-3" />
                          )}
                          {record.verificationType}
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-sm ${getMatchScoreColor(record.matchScore)}`}>
                        {record.matchScore !== null ? `${record.matchScore.toFixed(1)}%` : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
