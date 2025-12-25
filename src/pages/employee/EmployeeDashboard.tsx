import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import ApplyLeaveModal from "@/components/employee/ApplyLeaveModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/* ================= TYPES ================= */
type Leave = {
  _id: string;
  date: string;
  toDate?: string;
  leaveReason: string;
  leaveStatus: "pending" | "approved" | "rejected";
};

/* ================= STATUS BADGE ================= */
function LeaveStatusBadge({
  status,
}: {
  status: "pending" | "approved" | "rejected";
}) {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${map[status]}`}
    >
      {status}
    </span>
  );
}

/* ================= COMPONENT ================= */
export default function EmployeeDashboard() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  const token = localStorage.getItem("employeeToken");

  /* ================= FETCH LEAVES ================= */
  const fetchLeaves = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/attendance/attendance/my-leaves`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeaves(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch leaves", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  /* ================= UI ================= */
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>My Leaves</CardTitle>
          <p className="text-sm text-muted-foreground">
            Track your applied leave status
          </p>
        </div>

        <Button onClick={() => setOpenLeaveModal(true)}>
          Apply Leave
        </Button>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {leaves.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-sm text-muted-foreground"
                >
                  No leaves applied
                </TableCell>
              </TableRow>
            ) : (
              leaves.map((l) => (
                <TableRow key={l._id}>
                  <TableCell>
                    {new Date(l.date).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    {l.toDate
                      ? new Date(l.toDate).toLocaleDateString()
                      : "-"}
                  </TableCell>

                  <TableCell>{l.leaveReason}</TableCell>

                  <TableCell>
                    <LeaveStatusBadge status={l.leaveStatus} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* ================= APPLY LEAVE MODAL ================= */}
      <ApplyLeaveModal
        open={openLeaveModal}
        onClose={() => setOpenLeaveModal(false)}
        onSuccess={fetchLeaves}
      />
    </Card>
  );
}
