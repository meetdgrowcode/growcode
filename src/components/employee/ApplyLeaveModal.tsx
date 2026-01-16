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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply Leave</DialogTitle>
          <DialogDescription>
            Fill out the form below to apply for your leave.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>One Day / From Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div>
              <Label>To Date</Label>
              <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Leave Type</Label>
            <Select value={leaveType} onValueChange={setLeaveType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAID">Paid Leave</SelectItem>
                <SelectItem value="UNPAID">Unpaid Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Reason</Label>
            <Input value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} placeholder="Reason for leave..." />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submitLeave} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
