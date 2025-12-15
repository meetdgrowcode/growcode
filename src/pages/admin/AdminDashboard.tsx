import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avtar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/Table";

import { Users, Activity, Plus } from "lucide-react";
import CreateUserModal from "@/components/admin/CreateUserModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/* ================= TYPES ================= */

type User = {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
};

/* ================= HELPERS ================= */

// format date as DD/MM/YYYY
const formatDate = (date: string): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// check if date is today or yesterday
const isTodayOrYesterday = (date: string): boolean => {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date();

  yesterday.setDate(today.getDate() - 1);

  return (
    d.toDateString() === today.toDateString() ||
    d.toDateString() === yesterday.toDateString()
  );
};

/* ================= COMPONENT ================= */

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  // ONLY ACTIVE USERS
  const activeUsers = users.filter((u) => u.isActive);

  // ACTIVE + ADDED TODAY OR YESTERDAY
  const recentActiveUsers = users.filter(
    (u) => u.isActive && isTodayOrYesterday(u.createdAt)
  );

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");

      const res = await axios.get(`${BASE_URL}/api/v1/employee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">
          Admin Dashboard
        </h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee 
        </Button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">Total Employee</p>
            <p className="text-3xl font-semibold">{users.length}</p>
          </div>
          <Users className="h-6 w-6 text-slate-400" />
        </Card>

        <Card className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">Active Employee</p>
            <p className="text-3xl font-semibold">{activeUsers.length}</p>
          </div>
          <Activity className="h-6 w-6 text-green-500" />
        </Card>

        <Card className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">Inactive Employee</p>
            <p className="text-3xl font-semibold">
              {users.length - activeUsers.length}
            </p>
          </div>
          <Users className="h-6 w-6 text-red-400" />
        </Card>
      </div>

      {/* ================= RECENT ACTIVE USERS ================= */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Recent Active Employee</CardTitle>
          <span className="text-sm text-slate-500">
            Today & Yesterday
          </span>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <p className="p-6 text-sm text-slate-500">Loading employees...</p>
          ) : recentActiveUsers.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">
              No active employees added today or yesterday
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {recentActiveUsers.slice(0, 5).map((u) => (
                    <TableRow key={u._id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <img src="/logo.png" alt={u.name} />
                        </Avatar>
                        <span className="font-medium">{u.name}</span>
                      </TableCell>

                      <TableCell>{u.email}</TableCell>

                      <TableCell className="text-slate-500">
                        {formatDate(u.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================= CREATE USER MODAL ================= */}
      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
}
