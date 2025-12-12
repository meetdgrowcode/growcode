// src/pages/AdminSignIn.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
// import { getRoleByEmail } from "@/lib/mockUsers";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_ADMIN_AUTH_ENDPOINT;
console.log("BASE_URL:", BASE_URL);
export default function AdminSignIn() { 
  const navigate = useNavigate();

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
  setError(null);
  setLoading(true);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      {
        email: form.email,
        password: form.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // if backend uses cookies
      }
    );

    const token = response.data.token || response.data.accessToken;
    if (token) {
      localStorage.setItem('admin_token', token);
    } else {
      localStorage.setItem('admin_token', 'admin-demo-token');
    }

    localStorage.setItem('admin_email', form.email);
    navigate('/admin');
  } catch (err) {
    console.error(err);
    // const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
    // setError(msg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-2 text-xl font-bold">Growcode Solution — Admin</div>
            <CardDescription>Administrative access</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="admin@example.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-3 text-gray-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
