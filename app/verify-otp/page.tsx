"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import Link from "next/link";
import { Loader2, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill email from forgot password page
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
        // Redirect back if no email found
        router.push("/forgot-password");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if(!otp || otp.trim().length === 0) {
        setError("Please enter the OTP sent to your email.");
        return;
    }

    setLoading(true);
    
    // NOTE: Since the backend requires OTP + NewPassword together, we are just collecting OTP here
    // and passing it to the next step. Real verification happens at the Reset Password step.
    // In a real production app with separate validate-otp endpoint, we would call it here.
    
    sessionStorage.setItem("resetOtp", otp);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
        setLoading(false);
        router.push("/reset-password");
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex w-full items-center justify-center p-4 bg-white">
        <Card className="w-full max-w-md border-black/10 bg-white">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto p-3 rounded-full bg-black/5 w-fit mb-2">
              <KeyRound className="h-6 w-6 text-black" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-black">
              Verify OTP
            </CardTitle>
            <CardDescription className="text-zinc-600">
              Enter the OTP sent to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="otp"
                type="text"
                required
                placeholder="Enter OTP Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5 font-mono tracking-widest text-center text-lg"
              />

              {error && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 border-red-200 bg-red-50 text-red-900">
                  <AlertCircle className="h-4 w-4 text-red-900" />
                  <AlertTitle className="text-red-900 font-semibold">Error</AlertTitle>
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                variant="default"
                className="w-full bg-black text-white hover:bg-zinc-800"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
               Verify Code
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t border-zinc-100 pt-6">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-black hover:text-zinc-800 transition-colors underline"
            >
              Didn't receive OTP? Request again
            </Link>
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
