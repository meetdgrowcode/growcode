import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Play, Pause, Clock } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Status = "STOPPED" | "RUNNING";

const PROJECTS = [
  { id: "1", name: "Growcode HRMS" },
  { id: "2", name: "Client Dashboard" },
  { id: "3", name: "Mobile App Development" },
  { id: "4", name: "Internal Tools" },
  { id: "5", name: "Marketing Website" },
];

export default function EmployeeTracker() {
  const [status, setStatus] = useState<Status>("STOPPED");
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [baseSeconds, setBaseSeconds] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState(() => Date.now());
  const [sessions, setSessions] = useState<any[]>([]);

  const [selectedProject, setSelectedProject] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [error, setError] = useState("");

  const [idleMinutes, setIdleMinutes] = useState(0); // 🔥 ADMIN VALUE

  const token = localStorage.getItem("employeeToken");

  /* ================= FETCH IDLE MINUTES (ONCE) ================= */
  useEffect(() => {
    if (!token) return;

    const fetchIdleLimit = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/admin/settings/idle-limit`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (typeof res.data?.idleMinutes === "number") {
          setIdleMinutes(res.data.idleMinutes);
        }
      } catch {
        setIdleMinutes(0); // fallback = no idle
      }
    };

    fetchIdleLimit();
  }, [token]);

  /* ================= ACTIVITY REPORT (ONLY IF ENABLED) ================= */
  useEffect(() => {
    if (status !== "RUNNING" || idleMinutes <= 0 || !token) return;

    let throttle: any = null;

    const reportActivity = () => {
      if (throttle) return;

      throttle = setTimeout(async () => {
        try {
          await axios.post(
            `${BASE_URL}/api/v1/attendance/tracker/activity`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch {
          // silent
        } finally {
          throttle = null;
        }
      }, 5000); // max 1 call per 5 sec
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((e) => window.addEventListener(e, reportActivity));

    return () => {
      events.forEach((e) => window.removeEventListener(e, reportActivity));
      if (throttle) clearTimeout(throttle);
    };
  }, [status, idleMinutes, token]);

  /* ================= LOAD TODAY DATA ================= */
  const loadTodayData = async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/attendance/today-status`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        const {
          status: backendStatus,
          totalMs = 0,
          sessions: backendSessions = [],
        } = res.data;

        const newStatus: Status =
          backendStatus === "WORKING" ? "RUNNING" : "STOPPED";

        const syncedSeconds = Math.floor(totalMs / 1000);

        setStatus(newStatus);
        setBaseSeconds(syncedSeconds);
        setLastSyncTime(Date.now());
        setDisplaySeconds(syncedSeconds);
        setSessions(backendSessions);

        if (backendSessions.length > 0) {
          setCurrentTask(
            backendSessions[backendSessions.length - 1]?.taskName || ""
          );
        }
      }
    } catch {
      setDisplaySeconds(0);
    }
  };

  useEffect(() => {
    if (!token) return;
    loadTodayData();
    const i = setInterval(loadTodayData, 10000);
    return () => clearInterval(i);
  }, [token]);

  /* ================= LOCAL TIMER ================= */
  useEffect(() => {
    if (status !== "RUNNING") {
      setDisplaySeconds(baseSeconds);
      return;
    }

    const t = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastSyncTime) / 1000);
      setDisplaySeconds(baseSeconds + elapsed);
    }, 1000);

    return () => clearInterval(t);
  }, [status, baseSeconds, lastSyncTime]);

  /* ================= START / STOP ================= */
 const toggleTimer = async () => {
  if (!token) return;

  if (status === "STOPPED") {
    if (!selectedProject.trim()) {
      setError("Please select a project");
      return;
    }
    if (!currentTask.trim()) {
      setError("Please enter a task name");
      return;
    }
    setError("");
  }

  try {
    if (status === "RUNNING") {
      await axios.post(
        `${BASE_URL}/api/v1/attendance/timer/stop`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      // 🔥 FIX HERE
      const projectName =
        PROJECTS.find((p) => p.id === selectedProject)?.name || "";

      await axios.post(
        `${BASE_URL}/api/v1/attendance/timer/start`,
        {
          taskName: currentTask.trim(),
          projectName, // ✅ correct value
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    loadTodayData();
  } catch (err: any) {
    setError(err.response?.data?.message || "Failed to start timer");
  }
};



  const formatTime = (sec: number) => {
    const s = Number(sec) || 0;
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const r = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${r}`;
  };

  const formatTimeOnly = (d: string) =>
    new Date(d)
      .toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .toLowerCase();

  /* ================= UI (UNCHANGED) ================= */
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <Clock className="w-10 h-10 text-blue-600" />
              Work Tracker
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-7xl font-mono font-bold text-gray-900 mb-6">
                {formatTime(displaySeconds)}
              </div>
            </div>

            {status !== "RUNNING" && (
              <div className="space-y-4 max-w-md mx-auto">
                <Select
                  value={selectedProject}
                  onValueChange={setSelectedProject}
                >
                  <SelectTrigger className="py-6 text-lg">
                    <SelectValue placeholder="Choose project" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECTS.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  className="py-6 text-lg"
                  placeholder="Task name"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                />
              </div>
            )}

            <div className="flex justify-center">
              <Button
                size="lg"
                className={`px-24 py-12 text-3xl font-bold rounded-full ${
                  status === "RUNNING"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={toggleTimer}
              >
                {status === "RUNNING" ? (
                  <>
                    <Pause className="w-12 h-12 mr-4" /> STOP
                  </>
                ) : (
                  <>
                    <Play className="w-12 h-12 mr-4" /> START
                  </>
                )}
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="text-2xl font-semibold text-center mb-6">
                Today's Sessions
              </h3>

              {sessions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No sessions yet
                </div>
              ) : (
                sessions.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                  >
                    <div>
                      <div className="font-medium text-lg">
                        {s.taskName || "Untitled"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatTimeOnly(s.startTime)} -{" "}
                        {s.endTime ? formatTimeOnly(s.endTime) : "Running"}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatTime(Math.floor((s.durationMs || 0) / 1000))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
