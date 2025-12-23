import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import {
  Clock,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";
import ApplyLeaveModal from "@/components/employee/ApplyLeaveModal";

/* ================= HELPERS ================= */
function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

/* ================= TYPES ================= */
type Leave = {
  id: string;
  type: string;
  from: string;
  to: string;
  status: "Pending" | "Approved" | "Rejected";
};

export default function EmployeeDashboard() {
  /* UI placeholders */
  const [todaySeconds] = useState(5 * 3600 + 30 * 60);
  const [weekSeconds] = useState(22 * 3600 + 15 * 60);
  const [monthSeconds] = useState(96 * 3600 + 40 * 60);
  const [isWorking] = useState(true);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  const [leaves] = useState<Leave[]>([
    {
      id: "1",
      type: "Casual Leave",
      from: "10 Feb 2025",
      to: "11 Feb 2025",
      status: "Approved",
    },
    {
      id: "2",
      type: "Sick Leave",
      from: "20 Feb 2025",
      to: "20 Feb 2025",
      status: "Pending",
    },
  ]);

  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Employee Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Overview of your attendance and leave activity
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today"
          value={formatTime(todaySeconds)}
          icon={<Clock />}
        />
        <StatCard
          title="This Week"
          value={formatTime(weekSeconds)}
          icon={<CalendarDays />}
        />
        <StatCard
          title="This Month"
          value={formatTime(monthSeconds)}
          icon={<CalendarDays />}
        />
        <StatusCard isWorking={isWorking} />
      </div>

      {/* ================= LEAVE MANAGEMENT ================= */}
      <Card className="border-muted/40">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Leave Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              Apply and track your leave requests
            </p>
          </div>

          <Button onClick={() => setOpenLeaveModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Apply Leave
          </Button>

          <ApplyLeaveModal
            open={openLeaveModal}
            onClose={() => setOpenLeaveModal(false)}
          />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* LEAVE STATS */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <MiniStat title="Total Leaves" value="12" />
            <MiniStat title="Used Leaves" value="5" />
            <MiniStat title="Remaining" value="7" />
          </div>

          {/* LEAVE TABLE */}
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead>Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
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
                      No leave requests yet
                    </TableCell>
                  </TableRow>
                ) : (
                  leaves.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-medium">
                        {l.type}
                      </TableCell>
                      <TableCell>{l.from}</TableCell>
                      <TableCell>{l.to}</TableCell>
                      <TableCell>
                        <LeaveStatus status={l.status} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ================= INFO ================= */}
      <Card className="bg-muted/30">
        <CardHeader className="font-semibold">
          HRMS Insight
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Attendance and leave records directly affect payroll and compliance.
          Please ensure all actions are accurate.
        </CardContent>
      </Card>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold">{value}</p>
          </div>

          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusCard({ isWorking }: { isWorking: boolean }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-2">
          Current Status
        </p>

        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
            isWorking
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {isWorking ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {isWorking ? "Working" : "Idle"}
        </span>
      </CardContent>
    </Card>
  );
}

function MiniStat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function LeaveStatus({
  status,
}: {
  status: "Pending" | "Approved" | "Rejected";
}) {
  const map = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
}
