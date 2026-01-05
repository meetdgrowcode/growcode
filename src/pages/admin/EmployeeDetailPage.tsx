import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowLeft, ChevronLeft, ChevronRight, Clock } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/* ================= TYPES ================= */

type Session = {
  startTime: string;
  endTime: string | null;
  taskName: string;
  projectName: string;
  durationMs: number;
};

type DayData = {
  name: string;
  email: string;
  status: "Active" | "Idle" | "Offline";
  totalSeconds: number;
  currentSessionSeconds: number;
  sessions: Session[];
};

/* ================= HELPERS ================= */

const safe = (v: any) => Math.max(0, Number(v) || 0);

const formatHM = (sec: number) => {
  const m = Math.floor(safe(sec) / 60);
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};

const formatHMS = (sec: number) => {
  const s = safe(sec);
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const r = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${r}`;
};

const timeOnly = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

/* ================= COMPONENT ================= */

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("admin_token");

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const [data, setData] = useState<DayData | null>(null);
  const [liveTotal, setLiveTotal] = useState(0);
  const [liveSession, setLiveSession] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= API ================= */

  const fetchByDate = async (date: string) => {
    if (!id || !token) return;

    setLoading(true);
    const res = await axios.get(
      `${BASE_URL}/api/v1/attendance/employee/${id}/timeline?date=${date}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      const d = res.data.data;

      setData({
        name: d.name,
        email: d.email,
        status: d.status,
        totalSeconds: safe(d.totalTodaySeconds),
        currentSessionSeconds: safe(d.currentSessionSeconds),
        sessions: d.sessions || [],
      });

      // initialize live counters
      setLiveTotal(safe(d.totalTodaySeconds));
      setLiveSession(safe(d.currentSessionSeconds));
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchByDate(selectedDate);
  }, [selectedDate, id]);

  /* ================= LIVE 1-SECOND TICK ================= */

  useEffect(() => {
    if (!data) return;
    if (selectedDate !== todayStr) return;
    if (data.status !== "Active") return;

    const interval = setInterval(() => {
      setLiveSession((s) => s + 1);
      setLiveTotal((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [data, selectedDate]);

  /* ================= CALENDAR ================= */

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const isToday = (d: number) =>
    today.toDateString() === new Date(year, month, d).toDateString();

  const isSelected = (d: number) =>
    selectedDate === new Date(year, month, d).toISOString().slice(0, 10);

  const selectDay = (d: number) => {
    setSelectedDate(new Date(year, month, d).toISOString().slice(0, 10));
  };

  if (loading && !data) {
    return <div className="p-10 text-center text-gray-500">Loading…</div>;
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">

        <Link
          to="/admin/tracker"
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} /> Back
        </Link>

        {/* CALENDAR + TOTAL */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">

          {/* CALENDAR */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={() =>
                    month === 0
                      ? (setMonth(11), setYear(year - 1))
                      : setMonth(month - 1)
                  }
                >
                  <ChevronLeft size={18} />
                </button>

                <p className="font-semibold">
                  {new Date(year, month).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <button
                  onClick={() =>
                    month === 11
                      ? (setMonth(0), setYear(year + 1))
                      : setMonth(month + 1)
                  }
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array(firstDay)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} />
                  ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  return (
                    <button
                      key={day}
                      onClick={() => selectDay(day)}
                      className={`h-8 rounded text-sm ${
                        isSelected(day)
                          ? "bg-blue-600 text-white"
                          : isToday(day)
                          ? "bg-green-100 text-green-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* TOTAL TIME */}
          <Card>
            <CardContent className="p-8 flex flex-col justify-center items-center h-full">
              <p className="text-sm text-gray-500">Total time</p>
              <p className="text-5xl font-bold mt-2">
                {formatHM(liveTotal)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(selectedDate).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              {selectedDate === todayStr && data?.status === "Active" && (
                <div className="flex items-center gap-2 mt-4 text-green-600">
                  <Clock size={16} />
                  <span className="font-mono">
                    {formatHMS(liveSession)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SESSION LIST */}
        <Card>
          <CardContent className="p-6">
            {data?.sessions.length === 0 ? (
              <p className="text-center text-gray-500">
                No sessions for this date
              </p>
            ) : (
              <div className="space-y-4">
                {data.sessions.map((s, i) => {
                  const duration =
                    s.endTime
                      ? Math.floor(s.durationMs / 1000)
                      : Math.floor(s.durationMs / 1000) + liveSession;

                  return (
                    <div
                      key={i}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">
                          {s.taskName}{" "}
                          <span className="text-blue-600">
                            • {s.projectName}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          {timeOnly(s.startTime)} →{" "}
                          {s.endTime ? timeOnly(s.endTime) : "Running"}
                        </p>
                      </div>

                      <p className="font-mono font-semibold">
                        {formatHMS(duration)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
