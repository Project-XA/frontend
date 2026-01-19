"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import Link from "next/link";
import { Loader2, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        setSuccess(true);
        // Store email for the OTP page
        sessionStorage.setItem("resetEmail", email);
        setTimeout(() => router.push("/verify-otp"), 2000);
      } else {
        setError(response.message || "Failed to send OTP.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex w-full items-center justify-center p-4 bg-white">
        <Card className="w-full max-w-md border-black/10 bg-white">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto p-3 rounded-full bg-black/5 w-fit mb-2">
              <Mail className="h-6 w-6 text-black" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-black">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-zinc-600">
              Enter your email and we'll send you an OTP to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
                disabled={success}
              />

              {error && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 border-red-200 bg-red-50 text-red-900">
                  <AlertCircle className="h-4 w-4 text-red-900" />
                  <AlertTitle className="text-red-900 font-semibold">Error</AlertTitle>
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-500/50 bg-green-500/10 text-green-700 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>OTP Sent!</AlertTitle>
                  <AlertDescription>Check your email for the verification code. Redirecting...</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                variant="default"
                className="w-full bg-black text-white hover:bg-zinc-800"
                disabled={loading || success}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {success ? "OTP Sent!" : "Send OTP"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t border-zinc-100 pt-6">
            <Link
              href="/login"
              className="text-sm text-zinc-600 hover:text-black transition-colors"
            >
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
