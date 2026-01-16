import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  salary?: number;
  baseSalary?: number;
  isActive: boolean;
  
};

type Props = {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditUserModal({ user, onClose, onSuccess }: Props) {
  // Map baseSalary (from API) to salary (for form)
  const [form, setForm] = useState<User>({ 
    ...user, 
    salary: user.baseSalary ?? user.salary 
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("admin_token");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await axios.put(
        `${BASE_URL}/api/v1/employee/update/${user._id}`,
        {
          name: form.name,
          email: form.email,
          role: form.role,
          department: form.department,
          isActive: form.isActive, // ✅ IMPORTANT
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update salary using the salary API
      if (form.salary !== undefined && form.salary !== null) {
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
      }

      onSuccess(); // refetch users
      onClose();
    } catch (err) {
      console.error("Update user failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-lg">
        <CardHeader>Edit Employee</CardHeader>

        <CardContent className="space-y-4">
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="First Name"
          />

         

          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <Input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
          />

          <Input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
          />

          <Input
            name="salary"
            type="number"
            value={form.salary || ""}
            onChange={handleChange}
            placeholder="Salary"
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update Employee"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
