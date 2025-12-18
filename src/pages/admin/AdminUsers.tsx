
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

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
import { Pencil, Trash2 } from "lucide-react";
import EditUserModal from "@/components/admin/EditUserModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type User = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "employee";
  department: string;
  isActive: boolean;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const token = localStorage.getItem("admin_token");

  /* ================= FETCH ALL USERS ================= */
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/employee`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data?.data ?? res.data ?? []);
    } catch (err) {
      console.error("Fetch users failed", err);
      setUsers([]);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /* ================= TOGGLE ACTIVE ================= */
  const toggleStatus = async (u: User) => {
    try {
      setLoadingId(u._id);

      await axios.put(
        `${BASE_URL}/api/v1/employee/update/${u._id}`,
        { isActive: !u.isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchUsers();
    } catch (err) {
      console.error("Update status failed", err);
    } finally {
      setLoadingId(null);
    }
  };

  /* ================= DELETE USER ================= */
  const deleteUser = async (id: string) => {
    if (!confirm("Delete this employee?")) return;

    try {
      setLoadingId(id);

      await axios.delete(`${BASE_URL}/api/v1/employee/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
      <CardHeader className="font-semibold">
        Employees ({users.length})
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
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

                  <TableCell>
                    <button
                      disabled={loadingId === u._id}
                      onClick={() => toggleStatus(u)}
                      className={`px-2 py-1 rounded text-xs font-medium transition ${
                        u.isActive
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </button>
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
    </Card>
  );
}
