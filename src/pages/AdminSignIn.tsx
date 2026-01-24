import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

// ✅ CORRECT BASE URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminSignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data?.success && response.data?.token) {
        // ✅ STORE ONLY TOKEN STRING
        localStorage.setItem("admin_token", response.data.token);

        const from =
          (location.state as { from?: string })?.from || "/admin";

        navigate(from, { replace: true });
      } else {
        setError("Invalid login response");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-md overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-700 to-blue-900 w-full" />
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto bg-blue-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 border border-blue-100">
              <ShieldCheck className="w-8 h-8 text-blue-800" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Admin Portal</CardTitle>
            <CardDescription className="text-gray-500">
               Secure access for administrators
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors duration-200 h-5 w-5" />
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="pl-10 h-11 border-gray-200 focus:border-blue-600 focus:ring-blue-600/20 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="admin@example.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors duration-200 h-5 w-5" />
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 h-11 border-gray-200 focus:border-blue-600 focus:ring-blue-600/20 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-blue-800 hover:bg-blue-900 text-white shadow-lg shadow-blue-900/20 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 text-base font-medium mt-4"
                disabled={loading}
              >
                  {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2 mt-2"
                >
                   <span className="w-1 h-4 bg-red-500 rounded-full inline-block"></span>
                  {error}
                </motion.div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
