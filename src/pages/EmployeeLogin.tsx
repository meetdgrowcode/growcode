// EmployeeLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, form);

      const { token, user } = res.data;

      // ✅ STORE DATA
      localStorage.setItem("employeeToken", token);
      localStorage.setItem("employeeUser", JSON.stringify(user));

      navigate("/employee");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-semibold">Employee Login</h2>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <Button className="w-full" type="submit">
              Login
            </Button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
