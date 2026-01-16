import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Play, Pause, Clock, Briefcase, CheckCircle2, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      const res = await axios.get(
        `${BASE_URL}/api/v1/attendance/today-status`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
        const res = await axios.get(
          `${BASE_URL}/api/v1/admin/settings/idle-limit`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
          await axios.post(
            `${BASE_URL}/api/v1/attendance/timer/stop`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
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

    events.forEach((e) =>
      window.addEventListener(e, resetActivity, { passive: true })
    );

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
        await axios.post(
          `${BASE_URL}/api/v1/attendance/timer/stop`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          `${BASE_URL}/api/v1/attendance/timer/start`,
          {
            taskName: currentTask.trim(),
            projectName: selectedProject,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // mark activity immediately after starting the timer
        lastActivityRef.current = Date.now();
      }
      loadTodayData();
    } catch (err) {
      const axiosError = err as AxiosError<Record<string, unknown>>;
      setError(
        ((axiosError?.response?.data as Record<string, unknown>)
          ?.message as string) || "Failed to start timer"
      );
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
    <div className="flex bg-gray-50/50 justify-center pt-6 pb-10 px-4 min-h-[calc(100vh-4rem)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl self-start mt-2"
      >
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl ring-1 ring-black/5 overflow-hidden rounded-3xl">
          {/* Header */}
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl">
                 <Timer className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-white font-medium tracking-tight">Time Tracker</h2>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Daily Progress</p>
              </div>
            </div>
            <motion.div 
              animate={{ 
                backgroundColor: status === "RUNNING" ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.1)",
                color: status === "RUNNING" ? "#4ade80" : "#94a3b8"
              }}
              className="px-3 py-1 rounded-full text-xs font-bold border border-white/5"
            >
              {status === "RUNNING" ? "ACTIVE" : "IDLE"}
            </motion.div>
          </div>

          <CardContent className="p-6">
            {/* Main Timer Display */}
            <div className="text-center mb-8 relative">
              <motion.div 
                key={status}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block"
              >
                <div className={`text-6xl font-mono font-bold tracking-tighter tabular-nums ${
                    status === 'RUNNING' ? 'text-blue-600' : 'text-slate-700'
                  }`}>
                  {formatTime(displaySeconds)}
                </div>
                <div className="text-sm text-slate-400 font-medium mt-1">Total Hours Today</div>
              </motion.div>
            </div>

            {/* Controls */}
            {status !== "RUNNING" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 mb-6"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Project</label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger className="h-11 bg-slate-50 border-slate-200 focus:ring-blue-500/20 rounded-xl">
                      <SelectValue placeholder="Select a project..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECTS.map((proj) => (
                        <SelectItem key={proj.id} value={proj.name} className="focus:bg-blue-50">
                          {proj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Task Details</label>
                  <Input
                    className="h-11 bg-slate-50 border-slate-200 focus:ring-blue-500/20 rounded-xl"
                    placeholder="What are you working on?"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }} 
                      className="text-xs font-medium text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Action Button */}
            <motion.div layout>
              <Button
                onClick={toggleTimer}
                className={`w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-blue-900/5 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ${
                  status === "RUNNING"
                    ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20"
                }`}
              >
                  {status === "RUNNING" ? (
                    <span className="flex items-center gap-2">
                      <Pause className="w-5 h-5 fill-current" /> Stop Timer
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Play className="w-5 h-5 fill-current" /> Start Timer
                    </span>
                  )}
              </Button>
            </motion.div>

            <Separator className="my-8 opacity-50" />

            {/* Session History */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Recent Sessions</h3>
              </div>
              
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {sessions.length === 0 ? (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 border-2 border-dashed border-slate-100 rounded-2xl"
                    >
                      <p className="text-slate-400 text-sm">No sessions recorded today</p>
                    </motion.div>
                  ) : (
                    sessions.map((session, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-default"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 p-1.5 rounded-full ${session.endTime ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-blue-600'}`}>
                            {session.endTime ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-800 group-hover:text-blue-700 transition-colors">
                              {session.taskName || "Untitled Task"}
                            </div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">
                              {formatTimeOnly(session.startTime)}
                              <span className="mx-1 text-slate-300">•</span>
                              {session.endTime ? formatTimeOnly(session.endTime) : <span className="text-green-500 font-bold">Running...</span>}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                           <div className="text-sm font-bold font-mono text-slate-700 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                             {formatTime(Math.floor((session.durationMs || 0) / 1000))}
                           </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Footer/Copyright or extra info can go here to pad the bottom */}
        <div className="mt-8 text-center">
            <p className="text-xs text-slate-400 font-medium">✨ Keep up the good work!</p>
        </div>

      </motion.div>
    </div>
  );
}
