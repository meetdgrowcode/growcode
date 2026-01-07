import React, { useEffect, useRef, useState } from "react";
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
    icon: <LayoutDashboard className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    key: "tracker",
    label: "Tracker",
    to: "/employee/tracker",
    icon: <ClipboardList className="h-5 w-5" strokeWidth={1.5} />,
  },
  {
    key: "settings",
    label: "Settings",
    to: "/employee/settings",
    icon: <Settings className="h-5 w-5" strokeWidth={1.5} />,
  },
];

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`hidden md:flex flex-col border-r bg-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* TOP BAR / BRAND */}
        <div className="h-16 flex items-center justify-between px-4">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                G
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">GrowCode</div>
                <div className="text-xs text-gray-500">Admin panel</div>
              </div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <IconMenu className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-0 py-4 space-y-1">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.key}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={`flex items-center justify-center md:justify-start gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {React.cloneElement(item.icon as React.ReactElement, {
                  className: "h-5 w-5 flex-shrink-0"
                })}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-4">
          <button
            onClick={logout}
            className="flex w-full items-center justify-center md:justify-start gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-1 flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name || "Employee"}</h2>
            <p className="text-xs text-gray-500">Overview of recent activity</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3 py-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input 
                placeholder="Search..." 
                className="bg-transparent outline-none text-sm w-48 placeholder-gray-400" 
              />
            </div>

            <button className="relative p-2 rounded hover:bg-gray-100" title="Notifications">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen((s) => !s)}
                className="flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-100"
                aria-expanded={userMenuOpen}
              >
                <Avatar className="h-9 w-9">
                  {profileImageUrl ? (
                    <img src={profileImageUrl} alt={user?.name} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    getInitials(user?.name || "U")
                  )}
                </Avatar>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-40">
                  <Link to="/employee/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b">Settings</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}