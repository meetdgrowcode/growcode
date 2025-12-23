import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function EmployeeLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
    const res = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      form,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const token = res.data?.token;

    if (!token) {
      setError("Login failed. Please try again.");
      return;
    }

    // ✅ STORE ONLY TOKEN
    localStorage.setItem("employeeToken", token);

    // ❌ DO NOT STORE USER HERE
    localStorage.removeItem("employeeUser");

    navigate("/employee", { replace: true });
  } catch (err: any) {
    setError(
      err?.response?.data?.message ||
        "Invalid email or password"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-xl font-bold">
            Employee Login
          </div>
          <CardDescription>
            Login with your employee credentials
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
