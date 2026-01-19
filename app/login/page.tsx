"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import Link from "next/link";
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        login(response.data);
      } else {
        if (response.errors && response.errors.length > 0) {
          setErrors(response.errors);
        } else {
          setErrors([response.message || "Login failed"]);
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
      <main className="flex-1 flex w-full items-center justify-center pt-20 p-4 bg-white">
        <Card className="w-full max-w-md border-black/10 bg-white">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-black">
              Welcome back
            </CardTitle>
            <CardDescription className="text-zinc-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
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
              </div>

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

              <Button
                type="submit"
                variant="default"
                className="w-full bg-black text-white hover:bg-zinc-800"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 border-t border-zinc-100 pt-6">
            <Link
              href="/forgot-password"
              className="text-sm text-zinc-600 hover:text-black transition-colors"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-zinc-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-black hover:text-zinc-800 transition-colors underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
