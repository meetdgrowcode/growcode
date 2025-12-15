// src/pages/admin/AdminUsers.tsx
import { useEffect, useState } from "react";
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

const BASE_URL = import.meta.env.VITE_BASE_URL;

type User = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  department: string;
  isActive: boolean;
};

type FilterType = "all" | "active" | "inactive";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const token = localStorage.getItem("admin_token");

  // 🔹 Fetch users
  const fetchUsers = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${BASE_URL}/api/v1/employee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(Array.isArray(res.data) ? res.data : res.data.data);
    } catch (err) {
      console.error("Fetch users failed", err);
    }
  };

  // 🔹 Toggle Active / Inactive
  const toggleStatus = async (user: User) => {
    if (!token) return;

    try {
      setLoadingId(user._id);

      await axios.put(
        `${BASE_URL}/api/v1/employee/${user._id}`,
        {
          ...user,
          isActive: !user.isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      console.error("Update user failed", err);
    } finally {
      setLoadingId(null);
    }
  };

  // 🔹 Delete user
  const deleteUser = async (id: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      setLoadingId(id);

      await axios.delete(`${BASE_URL}/api/v1/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers();
    } catch (err) {
      console.error("Delete user failed", err);
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Filter logic (NO API)
  const filteredUsers = users.filter((u) => {
    if (filter === "active") return u.isActive;
    if (filter === "inactive") return !u.isActive;
    return true;
  });

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">Employees</h2>

        {/* 🔹 FILTER BADGES */}
        <div className="flex gap-2">
          {(["all", "active", "inactive"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                filter === f
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f === "all"
                ? "All"
                : f === "active"
                ? "Active"
                : "Inactive"}
            </button>
          ))}
        </div>
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
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-slate-500">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((u) => (
                <TableRow key={u._id}>
                  <TableCell className="font-medium">
                    {u.name} {u.surname}
                  </TableCell>

                  <TableCell>{u.email}</TableCell>

                  <TableCell>
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium">
                      {u.role}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        u.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>

                  <TableCell className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      disabled={loadingId === u._id}
                      onClick={() => toggleStatus(u)}
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
    </Card>
  );
}
