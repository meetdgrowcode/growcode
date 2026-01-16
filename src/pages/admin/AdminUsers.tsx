
import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/axios";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pencil, Trash2, Plus } from "lucide-react";
import EditUserModal from "@/components/admin/EditUserModal";
import CreateUserModal from "@/components/admin/CreateUserModal";



type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  department: string;
  baseSalary?: number;
  isActive: boolean;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const token = localStorage.getItem("admin_token");

  /* ================= FETCH ALL USERS ================= */
  const fetchUsers = useCallback(async () => {
    try {
      const res = await api.get(`/api/v1/employee`);

      setUsers(res.data?.data ?? res.data ?? []);
    } catch (err) {
      console.error("Fetch users failed", err);
      setUsers([]);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /* ================= DELETE USER ================= */
  const deleteUser = async (id: string) => {
    if (!confirm("Delete this employee?")) return;

    try {
      setLoadingId(id);

      await api.delete(`/api/v1/employee/delete/${id}`);

      fetchUsers();
    } catch (err) {
      console.error("Delete user failed", err);
    } finally {
      setLoadingId(null);
    }
  };

  /* ================= UI ================= */
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <span className="font-semibold">
          Employees ({users.length})
        </span>
        <Button 
          onClick={() => setCreateOpen(true)}
          className="flex gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Base Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-sm text-muted-foreground"
                >
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u._id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>{u.department}</TableCell>
                  <TableCell>
                    {u.baseSalary ? `₹${u.baseSalary.toLocaleString()}` : "-"}
                  </TableCell>

                  <TableCell className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setEditUser(u)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      disabled={loadingId === u._id}
                      onClick={() => deleteUser(u._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={fetchUsers}
        />
      )}

      {createOpen && (
        <CreateUserModal
          onClose={() => setCreateOpen(false)}
          onSuccess={fetchUsers}
        />
      )}
    </Card>
  );
}
