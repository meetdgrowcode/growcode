import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
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
import { Play, Square } from "lucide-react";

/* ================= TYPES ================= */
type TrackerEntry = {
  id: string;
  startTime: string;
  endTime?: string;
  duration: string;
  status: "Running" | "Completed";
};

/* ================= HELPERS ================= */
function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/* ================= COMPONENT ================= */
export default function EmployeeTracker() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [entries, setEntries] = useState<TrackerEntry[]>([]);

  /* ================= TIMER ================= */
  useEffect(() => {
    let timer: number | undefined;

    if (running) {
      timer = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [running]);

  /* ================= HANDLERS ================= */
  const startTracker = () => {
    setRunning(true);
    setSeconds(0);

    setEntries((prev) => [
      {
        id: Date.now().toString(),
        startTime: new Date().toLocaleTimeString(),
        duration: "Running",
        status: "Running",
      },
      ...prev,
    ]);
  };

  const stopTracker = () => {
    setRunning(false);

    setEntries((prev) =>
      prev.map((e, i) =>
        i === 0
          ? {
              ...e,
              endTime: new Date().toLocaleTimeString(),
              duration: formatTime(seconds),
              status: "Completed",
            }
          : e
      )
    );
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Work Tracker</h2>
            <p className="text-sm text-muted-foreground">
              Track your daily working hours
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xl font-mono font-semibold">
              {formatTime(seconds)}
            </div>

            {!running ? (
              <Button onClick={startTracker}>
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
            ) : (
              <Button variant="destructive" onClick={stopTracker}>
                <Square className="mr-2 h-4 w-4" />
                Stop
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* ================= TABLE ================= */}
      <Card>
        <CardHeader className="font-semibold">
          Today’s Activity
        </CardHeader>

        {/* IMPORTANT: p-0 + wrapper */}
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {entries.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-sm text-muted-foreground"
                    >
                      No tracking data yet
                    </TableCell>
                  </TableRow>
                ) : (
                  entries.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.startTime}</TableCell>
                      <TableCell>{e.endTime ?? "-"}</TableCell>
                      <TableCell>{e.duration}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            e.status === "Running"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {e.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
