import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ← Add for navigation
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/Table";
import { Plus, Clock } from "lucide-react"; // ← Clock for tracker link
import CreateUserModal from "@/components/admin/CreateUserModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/* ================= TYPES ================= */

type User = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  createdAt?: string;
};

type Leave = {
  _id: string;
  date: string;
  toDate: string;
  leaveReason: string;
  employeeId: {
    name?: string;
    email?: string;
  } | null;
};

/* ================= HELPERS ================= */

const formatDate = (date?: string) => {
  if (!date) return "-";
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

const isTodayOrYesterday = (date?: string) => {
  if (!date) return false;
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
  const [pendingLeaves, setPendingLeaves] = useState<Leave[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const token = localStorage.getItem("admin_token");

  /* ================= FETCH EMPLOYEES ================= */
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/employee`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted) {
          setUsers(res.data.data || res.data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, [token]);

  /* ================= FETCH PENDING LEAVES ================= */
  const fetchPendingLeaves = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/attendance/admin/pending-leaves`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingLeaves(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch pending leaves", error);
    }
  };

  useEffect(() => {
    fetchPendingLeaves();
  }, [token]);

  /* ================= LEAVE ACTION ================= */
  const handleLeaveAction = async (id: string, action: "approve" | "reject") => {
    try {
      await axios.put(`${BASE_URL}/api/v1/attendance/admin/leave-action/${id}`, { action }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingLeaves();
    } catch (error) {
      console.error("Leave action failed", error);
    }
  };

  /* ================= CALCULATIONS ================= */
  const activeUsers = users.filter((u) => u.isActive);
  const recentActiveUsers = activeUsers.filter((u) => isTodayOrYesterday(u.createdAt));

  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex gap-3">
          {/* ← Tracker Link Added */}
          <Link to="/admin/tracker">
            <Button variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              View Tracker
            </Button>
          </Link>
          <Button onClick={() => setShowCreate(true)} variant="default" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* ================= ACTIVE EMPLOYEES ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Active Employees</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentActiveUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No recent active employees
                  </TableCell>
                </TableRow>
              ) : (
                recentActiveUsers.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-bold">
                          {u.name[0].toUpperCase()}{u.surname ? u.surname[0].toUpperCase() : ""}
                        </AvatarFallback>
                      </Avatar>
                      {u.name} {u.surname}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{formatDate(u.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ================= LEAVE APPROVAL ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Requests</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pendingLeaves.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                    No pending leave requests
                  </TableCell>
                </TableRow>
              ) : (
                pendingLeaves.map((leave) => (
                  <TableRow key={leave._id}>
                    <TableCell className="font-medium">
                      {leave.employeeId?.name ?? "Deleted Employee"}
                    </TableCell>

                    <TableCell>
                      {leave.employeeId?.email ?? "-"}
                    </TableCell>

                    <TableCell>{leave.date}</TableCell>

                    <TableCell>{leave.toDate}</TableCell>

                    <TableCell className="max-w-[220px] truncate">
                      {leave.leaveReason}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" onClick={() => handleLeaveAction(leave._id, "approve")}>
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleLeaveAction(leave._id, "reject")}>
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}