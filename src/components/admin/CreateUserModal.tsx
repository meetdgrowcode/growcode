import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createEmployee } from "@/services/employe";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateUserModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      setError(null);

      await createEmployee(form);

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>Create User</CardHeader>
        <CardContent className="space-y-3">
          <Input name="name" placeholder="Name" onChange={handleChange} />
          <Input name="email" placeholder="Email" onChange={handleChange} />
          <Input name="department" placeholder="Department" onChange={handleChange} />
          <Input name="role" placeholder="Role" onChange={handleChange} />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
