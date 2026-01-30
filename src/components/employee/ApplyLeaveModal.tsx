import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { CalendarDays, FileText, LayoutGrid, Timer } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ApplyLeaveModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (data?: any) => void;
}) {
  const [date, setDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveType, setLeaveType] = useState("PAID");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("employeeToken");

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setDate("");
      setToDate("");
      setLeaveReason("");
      setLeaveType("PAID");
    }
  }, [open]);

  const submitLeave = async () => {
    if (!date || !toDate || !leaveReason || !leaveType) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/v1/leave/apply`,
        {
          fromDate: date,
          toDate,
          leaveType,
          leaveHours: 8, // Defaulted as per user request to remove manual input
          reason: leaveReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const created = res?.data?.leave || res?.data?.attendance || null;
      onSuccess(created);
      onClose();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    // only close when modal was open and user tries to close it
    if (open && !isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-2xl border-none shadow-2xl">
        {/* Decorative Header Background */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-white">Apply Leave</DialogTitle>
            </div>
            <DialogDescription className="text-blue-100">
              Fill out the details below to submit your leave request.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Timer className="w-4 h-4 text-blue-600" />
                From Date
              </Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-11 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Timer className="w-4 h-4 text-blue-600" />
                To Date
              </Label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="h-11 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-blue-600" />
              Leave Type
            </Label>
            <Select value={leaveType} onValueChange={setLeaveType}>
              <SelectTrigger className="h-11 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl transition-all">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAID">Paid Leave</SelectItem>
                <SelectItem value="UNPAID">Unpaid Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Reason
            </Label>
            <Input
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              placeholder="e.g. Doctor appointment, Family function..."
              className="h-11 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl transition-all"
            />
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 bg-gray-50/50">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-11 px-6 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-100 font-medium hover:text-gray-900 transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={submitLeave}
            disabled={loading}
            className="h-11 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 font-semibold transition-all duration-200"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
