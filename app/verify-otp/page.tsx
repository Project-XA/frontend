"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import Link from "next/link";
import { Loader2, KeyRound, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill email from forgot password page
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (storedEmail) {
      setFormData((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await authService.verifyOtp(formData);
      if (response.success) {
        setSuccess(true);
        sessionStorage.removeItem("resetEmail");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(response.message || "Failed to reset password.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-white">
      <Card className="w-full max-w-md border-black/10 bg-white">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto p-3 rounded-full bg-black/5 w-fit mb-2">
            <KeyRound className="h-6 w-6 text-black" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-black">
            Reset Password
          </CardTitle>
          <CardDescription className="text-zinc-600">
            Enter the OTP sent to your email and your new password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
              disabled={success}
            />
            <Input
              name="otp"
              type="text"
              required
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5 font-mono tracking-widest text-center text-lg"
              disabled={success}
            />
            <Input
              name="newPassword"
              type={showPassword ? "text" : "password"}
              required
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
              disabled={success}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-black transition-colors text-zinc-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500/50 bg-green-500/10 text-green-700 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Password Reset!</AlertTitle>
                <AlertDescription>Your password has been updated. Redirecting to login...</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              variant="default"
              className="w-full bg-black text-white hover:bg-zinc-800"
              disabled={loading || success}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {success ? "Success!" : "Reset Password"}
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
    </div>
  );
}
