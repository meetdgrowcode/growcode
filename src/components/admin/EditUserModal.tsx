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
  isActive: boolean;
};

type Props = {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditUserModal({ user, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<User>({ ...user });
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

          {/* ✅ STATUS SELECT */}
          <select
            name="isActive"
            value={String(form.isActive)}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

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
