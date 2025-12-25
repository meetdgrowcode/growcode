import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
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
import { Plus } from "lucide-react";
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
    const res = await axios.get(
      `${BASE_URL}/api/v1/attendance/admin/pending-leaves`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPendingLeaves(res.data.data);
  };

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  /* ================= LEAVE ACTION ================= */
  const handleLeaveAction = async (
    id: string,
    action: "approve" | "reject"
  ) => {
    await axios.put(
      `${BASE_URL}/api/v1/attendance/admin/leave-action/${id}`,
      { action },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchPendingLeaves();
  };

  /* ================= CALCULATIONS ================= */
  const activeUsers = users.filter((u) => u.isActive);
  const recentActiveUsers = activeUsers.filter((u) =>
    isTodayOrYesterday(u.createdAt)
  );

  /* ================= UI ================= */
  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="p-6">
          <p>Total Employees</p>
          <p className="text-3xl font-semibold">{users.length}</p>
        </Card>

        <Card className="p-6">
          <p>Active Employees</p>
          <p className="text-3xl font-semibold">{activeUsers.length}</p>
        </Card>

        <Card className="p-6">
          <p>Inactive Employees</p>
          <p className="text-3xl font-semibold">
            {users.length - activeUsers.length}
          </p>
        </Card>
      </div>

      {/* ================= RECENT EMPLOYEES ================= */}
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
              {recentActiveUsers.map((u) => (
                <TableRow key={u._id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <img src="/logo.png" />
                    </Avatar>
                    {u.name} {u.surname}
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{formatDate(u.createdAt)}</TableCell>
                </TableRow>
              ))}
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
            <TableCell
              colSpan={6}
              className="text-center text-sm text-muted-foreground"
            >
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
                  <Button
                    size="sm"
                    onClick={() =>
                      handleLeaveAction(leave._id, "approve")
                    }
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      handleLeaveAction(leave._id, "reject")
                    }
                  >
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
