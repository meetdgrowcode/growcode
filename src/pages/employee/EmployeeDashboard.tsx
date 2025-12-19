import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";

/* ================= HELPERS ================= */
function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

/* ================= COMPONENT ================= */
export default function EmployeeDashboard() {
  /**
   * IMPORTANT:
   * No useEffect here.
   * These are initial placeholder values.
   * When backend is connected, these will come from API.
   */

  const [todaySeconds] = useState<number>(5 * 3600 + 30 * 60); // 5h 30m
  const [weekSeconds] = useState<number>(22 * 3600 + 15 * 60);
  const [monthSeconds] = useState<number>(96 * 3600 + 40 * 60);
  const [isWorking] = useState<boolean>(true);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your work activity
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="text-sm font-medium">
            Today
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {formatTime(todaySeconds)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-sm font-medium">
            This Week
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {formatTime(weekSeconds)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-sm font-medium">
            This Month
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {formatTime(monthSeconds)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-sm font-medium">
            Status
          </CardHeader>
          <CardContent>
            <span
              className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                isWorking
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isWorking ? "Working" : "Idle"}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* ================= INFO ================= */}
      <Card>
        <CardHeader className="font-semibold">
          Productivity Insight
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Your working hours are calculated from the tracker.
          Make sure to start and stop your tracker properly to
          maintain accurate HR records.
        </CardContent>
      </Card>
    </div>
  );
}
