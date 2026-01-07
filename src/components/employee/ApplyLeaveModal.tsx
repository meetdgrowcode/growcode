import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ApplyLeaveModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [date, setDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("employeeToken");

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setDate("");
      setToDate("");
      setLeaveReason("");
    }
  }, [open]);

  const submitLeave = async () => {
    if (!date || !toDate || !leaveReason) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/v1/attendance/apply-leave`,
        { date, toDate, leaveReason },
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
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>From Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div>
            <Label>To Date</Label>
            <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>

          <div>
            <Label>Reason</Label>
            <Input value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} />
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
