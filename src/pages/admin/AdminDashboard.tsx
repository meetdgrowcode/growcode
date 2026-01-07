import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/Table";
import { Plus, Clock } from "lucide-react";
import CreateUserModal from "@/components/admin/CreateUserModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/* ================= TYPES ================= */

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

/* ================= COMPONENT ================= */

export default function AdminDashboardPage() {
  const [pendingLeaves, setPendingLeaves] = useState<Leave[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const token = localStorage.getItem("admin_token");

  /* ================= FETCH PENDING LEAVES ================= */
  const fetchPendingLeaves = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/attendance/admin/pending-leaves`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingLeaves(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch pending leaves", error);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    // defer call to avoid synchronous setState inside effect body
    (async () => {
      try {
        await fetchPendingLeaves();
      } catch (error) {
        console.error("Error fetching pending leaves on mount", error);
      }
    })();
  }, [token, fetchPendingLeaves]);

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