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
// import { RefreshCcw, Plus } from "lucide-react"; 
// Removing unused imports to satisfy linter

const BASE_URL = import.meta.env.VITE_BASE_URL || "";

/* ================= TYPES ================= */
type Leave = {
  _id: string;
  fromDate?: string;
  toDate?: string;
  reason?: string;
  leaveType?: string;
  approvalStatus?: string;
  // Legacy/Frontend specific
  date?: string;
  leaveReason?: string;
  leaveStatus?: "pending" | "approved" | "rejected";
};

/* ================= STATUS BADGE ================= */
function LeaveStatusBadge({
  status,
}: {
  status: "pending" | "approved" | "rejected";
}) {
  const map = {
    pending: "bg-blue-50 text-blue-700 border-blue-200", 
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
  } as const;

  const dot = {
    pending: "bg-blue-500",
    approved: "bg-emerald-500",
    rejected: "bg-red-500",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border ${map[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} aria-hidden />
      <span className="capitalize">{status}</span>
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
    <div className="space-y-8 p-2 sm:p-4 bg-white h-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-blue-100 pb-6 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-blue-950 tracking-tight">
            My Dashboard
          </h2>
          <p className="text-sm text-blue-500/80 mt-1 font-medium">
            Overview of your leave history and status
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={fetchLeaves}
            disabled={loading}
            className="h-9 px-4 gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-colors shadow-sm"
          >
            {loading ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-blue-300 border-t-blue-700" />
                <span className="text-xs">Updating...</span>
              </>
            ) : (
              <span className="text-xs font-semibold">Refresh</span>
            )}
          </Button>

          <Button 
            onClick={() => setOpenLeaveModal(true)} 
            className="h-9 px-5 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all font-semibold border-0"
          >
            <span className="text-xs">Request Leave</span>
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="rounded-xl border border-blue-100 bg-white shadow-sm overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader className="bg-blue-50/50">
            <TableRow className="border-b border-blue-100 hover:bg-transparent">
              <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-blue-900/60 pl-6 w-1/3">Reason</TableHead>
              <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-blue-900/60 w-1/6">Type</TableHead>
              <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-blue-900/60 w-1/4">Period</TableHead>
              <TableHead className="h-12 text-xs font-semibold uppercase tracking-wider text-blue-900/60 pr-6 text-right w-1/6">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow className="border-b border-blue-50">
                <TableCell colSpan={4} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-blue-600">
                    <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-blue-100 border-t-blue-600" />
                    <p className="text-xs font-medium text-blue-400">Loading records...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : leaves.length === 0 ? (
              <TableRow className="border-b border-blue-50">
                <TableCell colSpan={4} className="h-60 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 animate-in fade-in duration-500">
                    <div className="p-3 bg-blue-50 text-blue-300 rounded-full">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                       </svg>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-blue-900">No leave history</p>
                        <p className="text-xs text-blue-400 mt-1">Leave requests will appear here</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              leaves.map((l) => (
                <TableRow key={l._id} className="border-b border-blue-50 hover:bg-blue-50/30 transition-colors group">
                  <TableCell className="py-4 pl-6 align-middle">
                     {/* @ts-ignore */}
                     <div className="font-medium text-blue-950 text-sm max-w-[200px] truncate" title={l.reason || l.leaveReason}>
                        {/* @ts-ignore */}
                        {l.reason || l.leaveReason || "No reason provided"}
                     </div>
                  </TableCell>

                  <TableCell className="py-4 align-middle">
                    {/* @ts-ignore */}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                      // @ts-ignore
                      (l.leaveType || '').toUpperCase() === 'PAID' 
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-100' 
                        : (l.leaveType || '').toUpperCase() === 'MEDICAL' 
                           ? 'bg-rose-50 text-rose-700 border-rose-100'
                           : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>
                      {/* @ts-ignore */}
                      {l.leaveType || 'Unpaid'}
                    </span>
                  </TableCell>

                   <TableCell className="py-4 align-middle">
                      <div className="text-xs text-blue-700/80 font-medium bg-blue-50/50 inline-flex items-center px-2 py-1 rounded border border-blue-100/50">
                         <span className="text-blue-900">
                           {/* @ts-ignore */}
                           {l.fromDate ? new Date(l.fromDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short' }) : (l.date ? new Date(l.date).toLocaleDateString() : "-")}
                         </span>
                         <span className="mx-2 text-blue-300">→</span>
                         <span className="text-blue-900">
                           {l.toDate ? new Date(l.toDate).toLocaleDateString(undefined, { day: '2-digit', month: 'short' }) : "-"}
                         </span>
                      </div>
                  </TableCell>

                  <TableCell className="py-4 pr-6 align-middle text-right">
                    <LeaveStatusBadge status={(l.approvalStatus?.toLowerCase() || l.leaveStatus?.toLowerCase() || "pending") as "pending" | "approved" | "rejected"} />
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
