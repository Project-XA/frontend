"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { isAuthenticated } from "@/lib/authUtils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import Link from "next/link";
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        router.push("/dashboard");
      } else {
        setError(response.message || "Login failed");
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

            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
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
    </div>
  );
}
