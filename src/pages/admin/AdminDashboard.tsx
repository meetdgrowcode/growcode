import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
import { UserPlus, ClipboardList, Calendar, CheckCircle2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import CreateUserModal from "@/components/admin/CreateUserModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/* ================= TYPES ================= */

type Leave = {
  _id: string;
  fromDate: string;
  toDate: string;
  reason: string;
  leaveType: string;
  employeeId: {
    name: string;
    email: string;
    profilePic?: string;
  } | null;
};

/* ================= COMPONENT ================= */

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [pendingLeaves, setPendingLeaves] = useState<Leave[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const token = localStorage.getItem("admin_token");

  /* ================= FETCH PENDING LEAVES ================= */
  const fetchPendingLeaves = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/leave/admin/leaves/pending`, {
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
  const handleLeaveAction = async (id: string, action: "APPROVED" | "REJECTED") => {
    try {
      await axios.put(`${BASE_URL}/api/v1/leave/admin/leave-action/${id}`, { action }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingLeaves();
    } catch (error) {
      console.error("Leave action failed", error);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
         <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="text-base text-slate-500 mt-2">
              Overview of your employee management ecosystem.
            </p>
         </div>
         <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="h-10 px-4 gap-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-medium" 
              onClick={() => navigate("/admin/tracker")}
            >
               <ClipboardList className="h-4 w-4 text-slate-500" />
               View Tracker
            </Button>
            <Button 
              className="h-10 px-5 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 font-semibold" 
              onClick={() => setShowCreate(true)}
            >
               <UserPlus className="h-4 w-4" />
               Add Employee
            </Button>
         </div>
      </div>

      <Card className="border border-slate-200 shadow-lg shadow-slate-200/50 bg-white rounded-xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 p-6 bg-white">
          <CardTitle className="flex items-center gap-3 text-lg font-bold text-slate-800">
             <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                <Calendar className="h-5 w-5" />
             </div>
             Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-gray-100">
                <TableHead className="w-[250px] py-4 pl-8 text-xs font-semibold uppercase tracking-wider text-slate-500">Employee</TableHead>
                <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Leave Type</TableHead>
                <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Durations</TableHead>
                <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Reason</TableHead>
                <TableHead className="py-4 pr-8 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingLeaves.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                       <div className="p-4 rounded-full bg-slate-50 ring-1 ring-slate-100">
                          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                       </div>
                       <div className="space-y-1">
                          <p className="font-semibold text-slate-900">No pending requests</p>
                          <p className="text-sm">You're all caught up!</p>
                       </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                pendingLeaves.map((leave) => (
                  <TableRow key={leave._id} className="group hover:bg-slate-50 transition-colors border-gray-100">
                    <TableCell className="pl-8 py-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                          {leave.employeeId?.profilePic ? (
                            <img src={`${import.meta.env.VITE_BASE_URL}${leave.employeeId.profilePic}`} alt={leave.employeeId.name} className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-100">
                               {leave.employeeId?.name?.charAt(0)}
                            </div>
                          )}
                        </Avatar>
                        <div>
                           <p className="font-semibold text-slate-900">{leave.employeeId?.name}</p>
                           <p className="text-xs text-slate-500">{leave.employeeId?.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border shadow-sm ${
                        leave.leaveType === 'Medical'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {leave.leaveType}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium text-sm py-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-50 px-2 py-1 rounded text-xs font-mono text-slate-700 border border-slate-100">
                           {leave.fromDate ? new Date(leave.fromDate).toLocaleDateString() : 'N/A'}
                        </span>
                        <span className="text-slate-400">→</span>
                        <span className="bg-slate-50 px-2 py-1 rounded text-xs font-mono text-slate-700 border border-slate-100">
                           {leave.toDate ? new Date(leave.toDate).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] py-4">
                        <p className="truncate text-slate-500 text-sm pl-0.5" title={leave.reason}>{leave.reason}</p>
                    </TableCell>
                    <TableCell className="text-right pr-8 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-all h-9 px-4 rounded-lg font-medium"
                            onClick={() => handleLeaveAction(leave._id, "APPROVED")}
                        >
                          Approve
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            className="h-9 px-4 rounded-lg shadow-sm hover:shadow-md transition-all font-medium"
                            onClick={() => handleLeaveAction(leave._id, "REJECTED")}
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

      {/* Modals */}
      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
      </div>
    </div>
  );
}