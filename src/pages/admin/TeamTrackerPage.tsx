import { useEffect, useState } from "react";
import axios from "axios";
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

const formatTime = (sec: number) => {
  const safeSec = Math.floor(Number(sec) || 0);
  const h = String(Math.floor(safeSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((safeSec % 3600) / 60)).padStart(2, "0");
  const s = String(safeSec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export default function TeamTrackerPage() {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("admin_token");

  const projects = [
    "All Projects",
    "Growcode HRMS",
    "Client Portal",
    "Mobile App",
    "Internal Tools",
    "HRMS",
  ];

  const fetchTeamTracker = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/attendance/dashboard/admin`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        const mapped = res.data.data.map((emp: any) => ({
          _id: emp._id,
          name: emp.name,
          email: emp.email,
          projectName: emp.projectName,
          taskName: emp.taskName,
          totalTodaySeconds: emp.totalTodaySeconds,
          currentSessionSeconds: emp.currentSessionSeconds,
          yesterdaySeconds: emp.yesterdaySeconds,
          thisWeekSeconds: emp.thisWeekSeconds,
          thisMonthSeconds: emp.thisMonthSeconds,
          status: emp.status,
        }));

        mapped.sort((a: TeamMember, b: TeamMember) => {
          const order = { Active: 0, Idle: 1, Offline: 2 };
          return order[a.status] - order[b.status];
        });

        setTeamData(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch team data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamTracker();
    const dataInterval = setInterval(fetchTeamTracker, 30000); // Historical data every 30 seconds
    return () => clearInterval(dataInterval);
  }, [token]);

  // Live 1-second update for running timers
  useEffect(() => {
    const liveInterval = setInterval(() => {
      setTeamData((prev) =>
        prev.map((emp) =>
          emp.status === "Active"
            ? {
                ...emp,
                currentSessionSeconds: emp.currentSessionSeconds + 1,
                totalTodaySeconds: emp.totalTodaySeconds + 1,
              }
            : emp
        )
      );
    }, 1000);

    return () => clearInterval(liveInterval);
  }, []);

  const activeCount = teamData.filter((e) => e.status === "Active").length;
  const trackingCount = teamData.filter((e) => e.status !== "Offline").length;

  const filteredData = teamData.filter(
    (emp) =>
      selectedProject === "All Projects" ||
      emp.projectName.toLowerCase().includes(selectedProject.toLowerCase())
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
                  <SelectItem key={proj} value={proj} className="text-sm">
                    {proj}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

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
            filteredData.map((emp) => (
              <Card key={emp._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    {/* Left - Employee Info */}
                    {/* Replace the entire left section with this */}
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                          {emp.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <Link
                          to={`/admin/employee/${emp._id}`}
                          className="block"
                        >
                          <div className="flex items-center gap-4 hover:bg-gray-100 -m-2 p-2 rounded-lg transition cursor-pointer">
                            <div>
                              <h3 className="text-base font-semibold text-gray-900 hover:text-blue-600">
                                {emp.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {emp.email}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  emp.status === "Active"
                                    ? "bg-green-500 animate-pulse"
                                    : emp.status === "Idle"
                                    ? "bg-yellow-500"
                                    : "bg-gray-400"
                                }`}
                              />
                              <span className="text-xs text-gray-600 font-medium">
                                {emp.status}
                              </span>
                            </div>
                          </div>
                        </Link>

                        {emp.status !== "Offline" && (
                          <p className="text-xs text-gray-700 mt-1">
                            <span className="font-medium">{emp.taskName}</span>
                            {emp.projectName !== "-" && (
                              <span className="text-blue-600">
                                {" "}
                                • {emp.projectName}
                              </span>
                            )}
                          </p>
                        )}

                        {emp.status === "Offline" && (
                          <p className="text-xs text-gray-500 mt-1">
                            Not tracking today
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right - Timers */}
                    <div className="flex items-center gap-12">
                      <div className="flex items-center gap-10">
                        <div className="text-center">
                          <p className="font-mono text-lg font-bold text-blue-600">
                            {formatTime(emp.totalTodaySeconds)}
                          </p>
                          <p className="text-xs text-gray-600">Today</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono text-base font-semibold text-gray-800">
                            {formatTime(emp.yesterdaySeconds)}
                          </p>
                          <p className="text-xs text-gray-600">Yesterday</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono text-base font-semibold text-gray-800">
                            {formatTime(emp.thisWeekSeconds)}
                          </p>
                          <p className="text-xs text-gray-600">Week</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono text-base font-semibold text-gray-800">
                            {formatTime(emp.thisMonthSeconds)}
                          </p>
                          <p className="text-xs text-gray-600">Month</p>
                        </div>
                      </div>

                      {emp.status === "Active" && (
                        <div className="text-center">
                          <p className="font-mono text-xl font-bold text-green-600">
                            {formatTime(emp.currentSessionSeconds)}
                          </p>
                          <p className="text-xs text-green-700">Running</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
