import { useEffect, useState , useRef, useCallback, useLayoutEffect} from "react";
import axios, { AxiosError } from "axios";
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

type Project = {
  id: string;
  name: string;
};

type Session = {
  taskName: string;
  startTime: string;
  endTime?: string | null;
  durationMs: number;
};

const PROJECTS: Project[] = [
  { id: "1", name: "Growcode HRMS" },
  { id: "2", name: "Client Dashboard" },
  { id: "3", name: "Mobile App Development" },
  { id: "4", name: "Internal Tools" },
  { id: "5", name: "Marketing Website" },
];

export default function EmployeeTracker() {
  const [status, setStatus] = useState<Status>("STOPPED");
  const [displaySeconds, setDisplaySeconds] = useState<number>(0);
  const [baseSeconds, setBaseSeconds] = useState<number>(0);
  const [lastSyncTime, setLastSyncTime] = useState<number>(() => Date.now());
  const [sessions, setSessions] = useState<Session[]>([]);

  const [selectedProject, setSelectedProject] = useState<string>("");
  const [currentTask, setCurrentTask] = useState<string>("");
  const [error, setError] = useState<string>("");
  const lastActivityRef = useRef<number>(0);
  const isInitialMount = useRef<boolean>(true);

  const [idleMinutes, setIdleMinutes] = useState<number>(0);

  const token = localStorage.getItem("employeeToken");

/* ================= LOAD TODAY DATA ================= */
  const loadTodayData = useCallback(async (): Promise<void> => {
    if (!token) {
      setStatus("STOPPED");
      setDisplaySeconds(0);
      setBaseSeconds(0);
      setSessions([]);
      setSelectedProject("");
      setCurrentTask("");
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/api/v1/attendance/today-status`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const {
          status: backendStatus,
          totalMs = 0,
          sessions: backendSessions = [],
        } = res.data;

        const newStatus: Status = backendStatus === "WORKING" ? "RUNNING" : "STOPPED";
        const syncedSeconds = Math.floor(totalMs / 1000);

        setStatus(newStatus);
        // ensure idle tracker starts from now when timer is running
        if (newStatus === "RUNNING") {
          lastActivityRef.current = Date.now();
        }
        setBaseSeconds(syncedSeconds);
        setLastSyncTime(Date.now());
        setDisplaySeconds(syncedSeconds);
        setSessions(backendSessions);

        if (backendSessions.length > 0) {
          const lastSession = backendSessions[backendSessions.length - 1];
          setCurrentTask(lastSession.taskName || "");
        }
      }
    } catch (err) {
      console.error("Sync failed", err);
      setDisplaySeconds(0);
    }
  }, [token]);
useEffect(() => {
  if (!token) return;

  const fetchIdleLimit = async (): Promise<void> => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/admin/settings/idle-limit`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const minutes = Number(res.data.idleLimitMinutes);
      setIdleMinutes(minutes > 0 ? minutes : 0);
    } catch (err) {
      console.error("Failed to fetch idle limit", err);
      setIdleMinutes(0);
    }
  };

  fetchIdleLimit();
}, [token]);

  /* ================= SECRET AUTO-PAUSE (API CONTROLLED) ================= */
useEffect(() => {
    if (status !== "RUNNING" || idleMinutes === 0) return;

    const resetActivity = (): void => {
      lastActivityRef.current = Date.now();
    };

    const checkIdle = async (): Promise<void> => {
      const idleTimeMs = Date.now() - lastActivityRef.current;
      const idleLimitMs = idleMinutes * 60 * 1000;

      if (idleTimeMs >= idleLimitMs) {
        try {
          await axios.post(`${BASE_URL}/api/v1/attendance/timer/stop`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
          loadTodayData();
        } catch (err) {
          console.error("Secret auto-stop failed", err);
        }
      }
    };

    const events = [
      "mousemove",
      "mousedown",
      // include more keyboard/input events so typing counts as activity
      "keydown",
      "keypress",
      "keyup",
      "input",
      "focusin",
      "scroll",
      "touchstart",
      "touchmove",
      "click",
      "wheel",
    ];

    events.forEach((e) => window.addEventListener(e, resetActivity, { passive: true }));

    const interval = setInterval(checkIdle, 5000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetActivity));
      clearInterval(interval);
    };
  }, [status, idleMinutes, token, loadTodayData]);

  useEffect(() => {
    if (!token) return;
    
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      void loadTodayData();
    }
    
    const intervalId = setInterval(() => void loadTodayData(), 10000);
    return () => clearInterval(intervalId);
  }, [token, loadTodayData]);

  /* ================= LIVE TIMER ================= */
  useLayoutEffect(() => {
    // Only update display when status changes to RUNNING or when timer runs
    if (status !== "RUNNING") {
      // Sync display with base seconds when stopped (don't call setState in early return)
      setDisplaySeconds((prev) => (prev === baseSeconds ? prev : baseSeconds));
      return;
    }

    const timerId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastSyncTime) / 1000);
      setDisplaySeconds(baseSeconds + elapsed);
    }, 1000);

    return () => clearInterval(timerId);
  }, [status, baseSeconds, lastSyncTime]);

  /* ================= START / STOP ================= */
  const toggleTimer = async (): Promise<void> => {
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
        await axios.post(`${BASE_URL}/api/v1/attendance/timer/stop`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${BASE_URL}/api/v1/attendance/timer/start`, {
          taskName: currentTask.trim(),
          projectName: selectedProject,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // mark activity immediately after starting the timer
        lastActivityRef.current = Date.now();
      }
      loadTodayData();
    } catch (err) {
      const axiosError = err as AxiosError<Record<string, unknown>>;
      setError((axiosError?.response?.data as Record<string, unknown>)?.message as string || "Failed to start timer");
    }
  };

  const formatTime = (sec: number): string => {
    const safeSec = Number(sec) || 0;
    const h = String(Math.floor(safeSec / 3600)).padStart(2, "0");
    const m = String(Math.floor((safeSec % 3600) / 60)).padStart(2, "0");
    const s = String(safeSec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const formatTimeOnly = (dateString: string): string =>
    new Date(dateString)
      .toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .toLowerCase();

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
            {/* Main Timer */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-7xl font-mono font-bold text-gray-900 mb-6">
                {formatTime(displaySeconds)}
              </div>

              <div className="bg-blue-50 rounded-xl py-4 px-8 inline-block">
                <div className="text-lg text-gray-600 font-medium">
                  Today's Total Working Time
                </div>
                <div className="text-4xl font-bold text-blue-600 mt-2">
                  {formatTime(displaySeconds)}
                </div>
              </div>

              <div className="mt-6 text-2xl font-semibold text-gray-700 capitalize">
                {status === "RUNNING" ? "Tracking Active" : "Ready to Start"}
              </div>
            </div>

            {/* Project & Task Input - Only when stopped */}
            {status !== "RUNNING" && (
              <div className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Select Project <span className="text-red-500">*</span>
                  </label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger className="py-6 text-lg">
                      <SelectValue placeholder="Choose a project..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECTS.map((proj) => (
                        <SelectItem key={proj.id} value={proj.id}>
                          {proj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Task Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    className="py-6 text-lg"
                    placeholder="What are you working on?"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="text-center text-red-600 font-medium bg-red-50 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <p className="text-center text-sm text-gray-500">
                  This task will be used for all sessions today unless changed
                </p>
              </div>
            )}

            {/* Start/Stop Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                className={`px-24 py-12 text-3xl font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all ${
                  status === "RUNNING"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                onClick={toggleTimer}
              >
                {status === "RUNNING" ? (
                  <>
                    <Pause className="w-12 h-12 mr-4" />
                    STOP
                  </>
                ) : (
                  <>
                    <Play className="w-12 h-12 mr-4" />
                    START
                  </>
                )}
              </Button>
            </div>

            <Separator />

            {/* Sessions List */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Today's Sessions
              </h3>
              {sessions.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
                  No sessions yet. Select project & task, then press START!
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session: Session, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                    >
                      <div>
                        <div className="font-medium text-lg text-gray-800">
                          {session.taskName || "Untitled Task"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatTimeOnly(session.startTime)} -{" "}
                          {session.endTime
                            ? formatTimeOnly(session.endTime)
                            : "Running"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatTime(Math.floor((session.durationMs || 0) / 1000))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}