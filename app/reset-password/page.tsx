"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import Link from "next/link";
import { Loader2, Lock, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Retrieve email and OTP from previous steps
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    const storedOtp = sessionStorage.getItem("resetOtp");
    
    if (!storedEmail) {
       router.push("/forgot-password");
       return;
    }
    if (!storedOtp) {
       router.push("/verify-otp");
       return;
    }

    setFormData(prev => ({ ...prev, email: storedEmail, otp: storedOtp }));
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(false);

    if (formData.newPassword !== formData.confirmPassword) {
        setErrors(["Passwords do not match"]);
        return;
    }

    setLoading(true);
    
    try {
      // Call standard auth service which sends email, otp, newPassword
      const response = await authService.verifyOtp({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword
      });
      
      if (response.success) {
        setSuccess(true);
        // Clear session storage
        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("resetOtp");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        if (response.errors && response.errors.length > 0) {
            setErrors(response.errors);
        } else {
            setErrors([response.message || "Failed to reset password."]);
        }
      }
    } catch (err: any) {
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
        setErrors(err.response.data.errors);
      } else {
        const errorMsg = err.response?.data?.message || err.message || "An error occurred";
        setErrors([errorMsg]);
      }
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
              <Lock className="h-6 w-6 text-black" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-black">
              Reset Password
            </CardTitle>
            <CardDescription className="text-zinc-600">
              Create a new password for your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
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
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
                  disabled={success}
                   suffix={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="hover:text-black transition-colors text-zinc-500"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

              {errors.length > 0 && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 border-red-200 bg-red-50 text-red-900">
                  <AlertCircle className="h-4 w-4 text-red-900" />
                  <AlertTitle className="text-red-900 font-semibold">Error</AlertTitle>
                  <div className="mt-2 text-sm text-red-800 list-disc pl-4 space-y-1">
                      {errors.map((err, index) => (
                          <div key={index}>• {err}</div>
                      ))}
                  </div>
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
                {success ? "Success!" : "Update Password"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t border-zinc-100 pt-6">
              <div className="text-center text-sm text-zinc-600">
              Remember your password?{" "}
              <Link
                  href="/login"
                  className="font-medium text-black hover:text-zinc-800 transition-colors underline"
              >
                  Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
