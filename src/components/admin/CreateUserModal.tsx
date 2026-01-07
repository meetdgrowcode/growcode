// src/components/admin/CreateUserModal.tsx
import { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateUserModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
    salary: "",
    isActive: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("admin_token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    // ✅ FRONTEND VALIDATION (IMPORTANT)
    if (!form.name || !form.email || !form.password || !form.role || !form.department || !form.salary) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (isNaN(Number(form.salary)) || Number(form.salary) <= 0) {
      setError("Salary must be a valid positive number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create employee first
      await axios.post(
        `${BASE_URL}/api/v1/employee/add`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "employee",
          department: form.department,
          isActive: form.isActive,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update salary using the salary API
      await axios.put(
        `${BASE_URL}/api/v1/admin/update-salary-by-name`,
        {
          name: form.name,
          salary: Number(form.salary),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess(); // refresh dashboard/users
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-lg font-semibold">
          Create Employee
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-3 text-slate-500"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <Input
            name="role"
            placeholder="Role (e.g. Developer)"
            value={form.role}
            onChange={handleChange}
          />

          <Input
            name="department"
            placeholder="Department (e.g. IT)"
            value={form.department}
            onChange={handleChange}
          />

          <Input
            name="salary"
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={loading}>
              {loading ? "Creating..." : "Create Employee"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
