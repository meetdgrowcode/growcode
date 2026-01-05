import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu as IconMenu,
  LayoutDashboard,
  ClipboardList,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Dialog"; // Shadcn Dialog import

/* ================= TYPES ================= */
type User = {
  name: string;
  email: string;
  profilePic?: string;
};

type NavItem = {
  key: string;
  label: string;
  to: string;
  icon: React.ReactNode;
};

const NAV: NavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    to: "/employee",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    key: "tracker",
    label: "Tracker",
    to: "/employee/tracker",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    key: "settings",
    label: "Settings",
    to: "/employee/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Define BASE_URL safely
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  /* ===== LOAD USER FROM LOCALSTORAGE ===== */
  useEffect(() => {
    const stored = localStorage.getItem("employeeUser");
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage");
      }
    }
  }, []);

  // Listen for profile updates from settings page
  useEffect(() => {
    const handleProfileUpdate = () => {
      const stored = localStorage.getItem("employeeUser");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (err) {
          console.error("Failed to update user from event");
        }
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
  }, []);

  /* ===== AUTH GUARD ===== */
  useEffect(() => {
    if (!localStorage.getItem("employeeToken")) {
      navigate("/employee/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("employeeUser");
    navigate("/employee/login");
  };

  /* ===== GET INITIALS FROM NAME ===== */
  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    const first = names[0]?.[0] || "";
    const last = names.length > 1 ? names[names.length - 1]?.[0] : "";
    return (first + last).toUpperCase() || "U";
  };

  const profileImageUrl = user?.profilePic ? `${BASE_URL}${user.profilePic}` : null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`hidden md:flex flex-col border-r bg-white transition-all duration-200 ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        {/* TOP BAR */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                G
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">
                  GrowCode
                </div>
                <div className="text-xs text-slate-500">Employee Panel</div>
              </div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-slate-100"
          >
            <IconMenu className="h-5 w-5" />
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 px-2 pt-2">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                  active
                    ? "bg-sky-100 text-sky-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* LOGOUT */}
        <div className="border-t p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-1 flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              Welcome, {user?.name || "Employee"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 border px-3 py-1 rounded-md">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-48"
              />
            </div>

            <button className="p-2 rounded-md hover:bg-slate-100">
              <Bell className="h-5 w-5 text-slate-600" />
            </button>

            {/* Clickable Avatar with Lightbox */}
            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
              <DialogTrigger asChild>
                <button className="focus:outline-none">
                  <Avatar
                    className="h-9 w-9 cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-sky-400 transition-all duration-200"
                  >
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        alt={user?.name}
                        className="h-full w-full rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          (e.target as HTMLImageElement).parentElement!.textContent =
                            getInitials(user?.name || "U");
                        }}
                      />
                    ) : (
                      getInitials(user?.name || "U")
                    )}
                  </Avatar>
                </button>
              </DialogTrigger>

              {/* Lightbox (Moti Image) */}
              <DialogContent className="max-w-4xl border-0 bg-transparent shadow-none p-0 flex items-center justify-center">
                <div className="relative w-full max-h-[90vh]">
                  {profileImageUrl && (
                    <img
                      src={profileImageUrl}
                      alt={user?.name}
                      className="max-h-[90vh] max-w-full rounded-xl shadow-2xl object-contain mx-auto"
                    />
                  )}
                  <button
                    onClick={() => setLightboxOpen(false)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-3 text-gray-800 shadow-lg text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}