import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type TeamMember = {
  _id: string;
  name: string;
  email: string;
  projectName: string;
  taskName: string;
  totalTodaySeconds: number;
  currentSessionSeconds: number;
  yesterdaySeconds: number;
  thisWeekSeconds: number;
  thisMonthSeconds: number;
  status: "Active" | "Idle" | "Offline";
};

type ProjectType = {
  id: string;
  name: string;
};

type StatusOrder = {
  [key in "Active" | "Idle" | "Offline"]: number;
};

const formatTime = (sec: number): string => {
  const safeSec = Math.floor(Number(sec) || 0);
  const h = String(Math.floor(safeSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((safeSec % 3600) / 60)).padStart(2, "0");
  const s = String(safeSec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

// 🔥 Project ID → Name mapping
const PROJECTS: ProjectType[] = [
  { id: "1", name: "Growcode HRMS" },
  { id: "2", name: "Client Dashboard" },
  { id: "3", name: "Mobile App Development" },
  { id: "4", name: "Internal Tools" },
  { id: "5", name: "Marketing Website" },
];

// 🔥 Function to convert project id/number to name
const getProjectName = (projectIdOrName: string): string => {
  if (
    !projectIdOrName ||
    projectIdOrName === "-" ||
    projectIdOrName === "No Project"
  ) {
    return "";
  }

  const project = PROJECTS.find((p) => p.id === projectIdOrName);
  return project ? project.name : projectIdOrName;
};

type ApiResponse = {
  success: boolean;
  data: Array<Record<string, unknown>>;
  message?: string;
};

type IdleLimitResponse = {
  idleLimitMinutes?: number;
  success?: boolean;
  message?: string;
};

export default function TeamTrackerPage() {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [loading, setLoading] = useState(true);

  // Auto-pause time setting
  const [idleMinutes, setIdleMinutes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const token = localStorage.getItem("admin_token");

  const projects: string[] = [
    "All Projects",
    "Growcode HRMS",
    "Client Dashboard",
    "Mobile App Development",
    "Internal Tools",
    "Marketing Website",
  ];

  /* ================= FETCH TEAM DATA ================= */
  const fetchTeamTracker = useCallback(async (): Promise<void> => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get<ApiResponse>(
        `${BASE_URL}/api/v1/attendance/dashboard/admin`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched team tracker data:", res.data);

      if (res.data.success) {
        const mapped = res.data.data.map((emp: Record<string, unknown>) => ({
          _id: String(emp.employeeId || ""),
          name: String(emp.name || ""),
          email: String(emp.email || ""),
          projectName: String(emp.projectName || "-"),
          taskName: String(emp.taskName || ""),
          totalTodaySeconds: Number(emp.totalTodaySeconds || 0),
          currentSessionSeconds: Number(emp.currentSessionSeconds || 0),
          yesterdaySeconds: Number(emp.yesterdaySeconds || 0),
          thisWeekSeconds: Number(emp.thisWeekSeconds || 0),  
          thisMonthSeconds: Number(emp.thisMonthSeconds || 0),
          status: (emp.status as "Active" | "Idle" | "Offline") || "Offline",
        }));
        console.log("Mapped team data:", mapped);

        const order: StatusOrder = { Active: 0, Idle: 1, Offline: 2 };
        mapped.sort((a: TeamMember, b: TeamMember) => {
          return order[a.status] - order[b.status];
        });

        setTeamData(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch team data", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* ================= FETCH CURRENT IDLE LIMIT ================= */
  const fetchIdleLimit = useCallback(async (): Promise<void> => {
    try {
      const res = await axios.get<IdleLimitResponse>(
        `${BASE_URL}/api/v1/admin/settings/idle-limit`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIdleMinutes(res.data.idleLimitMinutes?.toString() || "");
    } catch (err) {
      console.error("Failed to fetch idle limit ", err);
    }
  }, [token]);

  /* ================= SAVE IDLE LIMIT ================= */
  const saveIdleLimit = async (): Promise<void> => {
    if (!idleMinutes || Number(idleMinutes) < 1) {
      setSaveMessage("Please enter a valid number (minimum 1 minute)");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }

    setSaving(true);
    try {
      const res = await axios.post<IdleLimitResponse>(
        `${BASE_URL}/api/v1/admin/settings/idle-limit`,
        { idleLimitMinutes: Number(idleMinutes) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setIdleMinutes(res.data.idleLimitMinutes?.toString() || "");
        setSaveMessage("Auto-pause time saved successfully!");
      } else {
        setSaveMessage(res.data.message || "Failed to save");
      }

      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      const axiosError = err as AxiosError<Record<string, unknown>>;
      console.error("Save idle limit error:", err);
      setSaveMessage(
        ((axiosError.response?.data as Record<string, unknown>)
          ?.message as string) || "Failed to save"
      );
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTeamTracker();
      fetchIdleLimit();

      const dataInterval = setInterval(fetchTeamTracker, 30000);
      return () => clearInterval(dataInterval);
    }
  }, [token, fetchTeamTracker, fetchIdleLimit]);

  // Live 1-second update for running timers
  useEffect(() => {
    const liveInterval = setInterval(() => {
      setTeamData((prev) =>
        prev.map((emp) => {
          if (emp.status === "Active") {
            return {
              ...emp,
                currentSessionSeconds: emp.currentSessionSeconds + 1,
            };
          }
          return emp;
        })
      );
    }, 1000);

    return () => clearInterval(liveInterval);
  }, []);

  const activeCount = teamData.filter((e) => e.status === "Active").length;
  const trackingCount = teamData.filter((e) => e.status !== "Offline").length;

  const filteredData = teamData.filter(
    (emp) =>
      selectedProject === "All Projects" ||
      getProjectName(emp.projectName)
        .toLowerCase()
        .includes(selectedProject.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/admin"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-7 w-7 text-blue-600" />
                Team Live Tracker
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {activeCount} active • {trackingCount} tracking •{" "}
                {teamData.length} members
              </p>
            </div>

            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full md:w-64 text-sm">
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((proj) => (
                  <SelectItem key={proj} value={proj} className="text-sm ">
                    {proj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Auto-Pause Time Setting */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <label className="text-sm font-medium text-gray-700">
                Auto-pause timer after inactivity (minutes):
              </label>
              <Input
                type="number"
                min="1"
                value={idleMinutes}
                onChange={(e) => setIdleMinutes(e.target.value)}
                className="w-24"
                placeholder="e.g. 5"
              />
              <Button onClick={saveIdleLimit} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              {saveMessage && (
                <span
                  className={`text-sm ml-4 ${
                    saveMessage.includes("success")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {saveMessage}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              If employee is inactive for this many minutes, their timer will
              pause automatically. Leave blank or 0 to disable.
            </p>
          </CardContent>
        </Card>

        {/* Employee Cards */}
        <div className="space-y-3">
          {loading ? (
            Array(8)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-20 bg-gray-200 rounded-lg" />
                  </CardContent>
                </Card>
              ))
          ) : filteredData.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                No employees found
              </CardContent>
            </Card>
          ) : (
            filteredData.map((emp) => {
              return (
                <Card
                  key={emp._id}
                  className="hover:shadow-md transition-shadow bg-white rounded-xl border border-gray-100"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-0">
                      {/* Left - Employee Info (Avatar + Details + Status) */}
                      <div className="flex items-center gap-4 w-full xl:w-auto">
                        {/* Avatar */}
                        <Avatar className="h-12 w-12 sm:h-14 sm:w-14 shrink-0">
                          <AvatarFallback
                            className={`text-base font-semibold text-white ${
                              emp.status === "Active"
                                ? "bg-purple-600"
                                : "bg-purple-500/80"
                            }`}
                          >
                            {emp.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        {/* Name & Details */}
                        <div className="flex flex-col gap-1 min-w-[200px]">
                          <div className="flex items-center gap-3">
                            <Link to={`/admin/employee/${emp._id}`}>
                              <h3 className="text-base sm:text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
                                {emp.name}
                              </h3>
                            </Link>

                            {/* Status Pill */}
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  emp.status === "Active"
                                    ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                                    : emp.status === "Idle"
                                    ? "bg-yellow-400"
                                    : "bg-gray-400"
                                }`}
                              />
                              <span className="text-sm font-medium text-gray-500">
                                {emp.status}
                              </span>
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 font-medium">
                            {emp.email}
                          </div>

                          {/* Last/Current Activity */}
                          {emp.status !== "Offline" ? (
                            <div className="text-sm text-gray-500 flex items-center gap-1.5 truncate max-w-[300px]">
                            <span className="truncate">{emp.taskName || "Tracking"}</span>
                             {getProjectName(emp.projectName) && (
                                <>
                                  <span className="text-gray-300">•</span>
                                  <span className="text-blue-600 font-medium truncate">
                                    {getProjectName(emp.projectName)}
                                  </span>
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400 italic">
                              Not tracking today
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right - Time Stats Grid */}
                      <div className="flex items-center justify-between w-full xl:w-auto xl:gap-12 lg:gap-8 gap-4 overflow-x-auto pb-2 xl:pb-0">
                        {/* Today */}
                        <div className="flex flex-col items-center min-w-[80px]">
                          <span className="text-lg sm:text-xl font-bold text-blue-600 font-mono tracking-tight">
                            {formatTime(emp.totalTodaySeconds)}
                          </span>
                          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Today
                          </span>
                        </div>

                        {/* Yesterday */}
                        <div className="flex flex-col items-center min-w-[80px]">
                          <span className="text-base sm:text-lg font-semibold text-gray-800 font-mono tracking-tight">
                            {formatTime(emp.yesterdaySeconds)}
                          </span>
                          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Yesterday
                          </span>
                        </div>

                        {/* Week */}
                        <div className="flex flex-col items-center min-w-[80px]">
                          <span className="text-base sm:text-lg font-semibold text-gray-800 font-mono tracking-tight">
                            {formatTime(emp.thisWeekSeconds)}
                          </span>
                          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Week
                          </span>
                        </div>

                        {/* Month */}
                        <div className="flex flex-col items-center min-w-[80px]">
                          <span className="text-base sm:text-lg font-semibold text-gray-800 font-mono tracking-tight">
                            {formatTime(emp.thisMonthSeconds)}
                          </span>
                          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                            Month
                          </span>
                        </div>

                        {/* Running Timer */}
                        <div className="flex flex-col items-center min-w-[90px]">
                             <span className={`text-lg sm:text-xl font-bold font-mono tracking-tight ${emp.status === 'Active' ? 'text-green-500' : 'text-gray-800'}`}>
                            {formatTime(emp.currentSessionSeconds)}
                          </span>
                          <span className={`text-xs font-medium uppercase tracking-wide ${emp.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                            Running
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}