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
import { Button } from "@/components/ui/Button";
import ApplyLeaveModal from "@/components/employee/ApplyLeaveModal";

const BASE_URL = import.meta.env.VITE_BASE_URL || "";

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
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  } as const;

  const dot = {
    pending: "bg-yellow-400",
    approved: "bg-green-500",
    rejected: "bg-red-500",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold capitalize ${map[status]}`}
    >
      <span className={`h-2 w-2 rounded-full ${dot[status]}`} aria-hidden />
      {status}
    </span>
  );
}

/* ================= COMPONENT ================= */
export default function EmployeeDashboard() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("employeeToken");

  /* ================= FETCH LEAVES ================= */
  const fetchLeaves = async () => {
    if (!BASE_URL) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/leave/my-leaves`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setLeaves(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch leaves", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Leaves</h2>
          <p className="text-sm text-gray-500">Track your applied leave status and history</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={fetchLeaves}
            disabled={loading}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                Refreshing...
              </span>
            ) : (
              "Refresh"
            )}
          </Button>

          <Button onClick={() => setOpenLeaveModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            Apply Leave
          </Button>
        </div>
      </div>

      <div className="w-full bg-white rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-300">
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-700 bg-white">Reason</TableHead>
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-700 bg-white">Type</TableHead>
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-700 bg-white">From</TableHead>
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-700 bg-white">To</TableHead>
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-700 bg-white">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow className="border-b border-gray-200">
                <TableCell colSpan={5} className="h-24 text-center py-12">
                  <div className="inline-flex items-center gap-3 text-sm text-gray-600">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                    Loading leaves...
                  </div>
                </TableCell>
              </TableRow>
            ) : leaves.length === 0 ? (
              <TableRow className="border-b border-gray-200">
                <TableCell colSpan={5} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-300">
                      <path d="M3 7h18M8 21V7a4 4 0 00-4-4" strokeWidth="1.5" />
                    </svg>
                    <div className="font-medium text-gray-700">No leaves applied</div>
                    <div className="text-xs text-gray-500">Click "Apply Leave" to create one</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              leaves.map((l) => (
                <TableRow key={l._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <TableCell className="h-14 px-6 align-middle text-sm text-gray-900 font-medium">
                    {/* @ts-ignore */}
                    {l.reason ? l.reason.substring(0, 20) : "-"}
                  </TableCell>

                  <TableCell className="h-14 px-6 align-middle text-sm">
                    {/* @ts-ignore */}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      // @ts-ignore
                      l.leaveType === 'PAID' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {/* @ts-ignore */}
                      {l.leaveType}
                    </span>
                  </TableCell>

                  <TableCell className="h-14 px-6 align-middle text-sm text-gray-700">
                    {/* @ts-ignore */}
                    {l.fromDate ? new Date(l.fromDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "-"}
                  </TableCell>

                  <TableCell className="h-14 px-6 align-middle text-sm text-gray-700">
                    {l.toDate ? new Date(l.toDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "-"}
                  </TableCell>

                  <TableCell className="h-14 px-6 align-middle text-sm">
                    {/* @ts-ignore */}
                    <LeaveStatusBadge status={l.approvalStatus?.toLowerCase() || "pending"} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= APPLY LEAVE MODAL ================= */}
      <ApplyLeaveModal
        open={openLeaveModal}
        onClose={() => setOpenLeaveModal(false)}
        onSuccess={(createdLeave?: Leave) => {
          if (createdLeave) {
            const mapped = {
              _id: createdLeave._id,
              date: createdLeave.date,
              toDate: createdLeave.toDate || null,
              leaveReason: createdLeave.leaveReason || "",
              leaveStatus: createdLeave.leaveStatus || "pending",
            } as Leave;

            setLeaves((prev) => [mapped, ...prev]);
          } else {
            fetchLeaves();
          }
        }}
      />
    </div>
  );
}
