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

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    confirmEmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "User" as "Admin" | "User",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(formData);
      if (response.success) {
        router.push("/login");
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 py-12 bg-white">
      <Card className="w-full max-w-lg border-black/10 bg-white">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-black">
            Create an account
          </CardTitle>
          <CardDescription className="text-zinc-600">
            Join us today and start managing your organization efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="fullName"
                type="text"
                required
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
              />
              <Input
                name="userName"
                type="text"
                required
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
               <Input
                name="email"
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
              />
              <Input
                name="confirmEmail"
                type="email"
                required
                placeholder="Confirm Email"
                value={formData.confirmEmail}
                onChange={handleChange}
                className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
              />
            </div>

            <Input
              name="phoneNumber"
              type="tel"
              required
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
             />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
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
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-white border-zinc-200 text-black placeholder:text-zinc-400 focus:border-black focus:ring-black/5"
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
            </div>

            <div className="space-y-2">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="flex h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/5 focus-visible:border-black"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
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
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-zinc-100 pt-6">
          <p className="text-sm text-zinc-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-black hover:text-zinc-800 transition-colors underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
