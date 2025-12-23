import { useEffect, useRef, useState } from "react";
import axios from "axios";
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
import { Play, Pause, Square } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/* ================= TYPES ================= */
type Status = "IDLE" | "WORKING" | "BREAK" | "COMPLETED";

type LogEntry = {
  id: string;
  action: string;
  time: string;
};

/* ================= CONSTANTS ================= */
const ACTIONS = {
  CHECK_IN: "CHECK_IN",
  BREAK_START: "BREAK_START",
  BREAK_END: "BREAK_END",
  CHECK_OUT: "CHECK_OUT",
} as const;

export default function EmployeeTracker() {
  const [status, setStatus] = useState<Status>("IDLE");
  const [seconds, setSeconds] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const timerRef = useRef<number | null>(null);
  const token = localStorage.getItem("employeeToken");

  /* ================= FORMAT ================= */
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  /* ================= LOAD FROM STORAGE ================= */
  useEffect(() => {
    const saved = localStorage.getItem("employee_tracker_state");
    if (saved) {
      const parsed = JSON.parse(saved);
      setStatus(parsed.status);
      setSeconds(parsed.seconds);
      setLogs(parsed.logs || []);
    }
  }, []);

  /* ================= SAVE TO STORAGE ================= */
  useEffect(() => {
    localStorage.setItem(
      "employee_tracker_state",
      JSON.stringify({ status, seconds, logs })
    );
  }, [status, seconds, logs]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (status === "WORKING") {
      timerRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [status]);

  /* ================= API ================= */
  const markAttendance = async (action: string) => {
    if (!token) return;

    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/api/v1/attendance/Attendance`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err: any) {
      console.warn("Backend:", err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOG ================= */
  const addLog = (action: string) => {
    setLogs((prev) => [
      {
        id: Date.now().toString(),
        action,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  /* ================= ACTIONS ================= */
  const startWork = async () => {
    await markAttendance(ACTIONS.CHECK_IN);
    setStatus("WORKING");
    addLog("Work Started");
  };

  const pauseWork = async () => {
    await markAttendance(ACTIONS.BREAK_START);
    setStatus("BREAK");
    addLog("Break Started");
  };

  const resumeWork = async () => {
    await markAttendance(ACTIONS.BREAK_END);
    setStatus("WORKING");
    addLog("Break Ended");
  };

  const stopWork = async () => {
    await markAttendance(ACTIONS.CHECK_OUT);
    setStatus("COMPLETED");
    addLog("Work Completed");
    localStorage.removeItem("employee_tracker_state");
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* TRACKER CARD */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Work Tracker</h2>
          <p className="text-sm text-muted-foreground">
            Track today’s working hours
          </p>
        </CardHeader>

        <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* TIMER */}
          <div className="text-3xl font-mono font-bold text-center sm:text-left">
            {formatTime(seconds)}
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center gap-3">
            {status === "IDLE" && (
              <Button onClick={startWork} disabled={loading}>
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
            )}

            {status === "WORKING" && (
              <>
                <Button variant="secondary" onClick={pauseWork}>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
                <Button variant="destructive" onClick={stopWork}>
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </Button>
              </>
            )}

            {status === "BREAK" && (
              <Button onClick={resumeWork}>
                <Play className="mr-2 h-4 w-4" />
                Resume
              </Button>
            )}

            {status === "COMPLETED" && (
              <span className="text-sm text-muted-foreground">
                Work completed for today
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ACTIVITY TABLE */}
      <Card>
        <CardHeader className="font-semibold">
          Today’s Activity
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-sm text-muted-foreground"
                  >
                    No activity yet
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell>{l.action}</TableCell>
                    <TableCell>{l.time}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
