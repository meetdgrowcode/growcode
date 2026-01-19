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
} from "@/components/ui/Dialog";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/Sheet";


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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="flex min-h-screen bg-white transition-colors duration-300">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`hidden md:flex flex-col border-r border-slate-200 bg-white text-slate-600 transition-all duration-300 ease-in-out shadow-xl z-20 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* TOP BAR / BRAND */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-slate-100">
          {collapsed ? (
             <div className="mx-auto">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                  G
                </div>
             </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
                G
              </div>
              <div>
                <div className="text-base font-bold text-slate-800 tracking-tight">GrowCode</div>
                <div className="text-xs text-slate-500 font-medium tracking-wide uppercase">Employee Panel</div>
              </div>
            </div>
          )}

          {!collapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Toggle sidebar"
            >
              <IconMenu className="h-5 w-5" />
            </button>
          )}
        </div>

        {collapsed && (
             <div className="flex justify-center py-4 border-b border-slate-100">
                <button
                    onClick={() => setCollapsed(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <IconMenu className="h-5 w-5" />
                </button>
             </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto scrollbar-hide">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.key}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20 ring-1 ring-white/10"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                } ${collapsed ? "justify-center" : ""}`}
              >
                {/* Fixed: Use a styled wrapper instead of cloneElement to avoid type errors and ensure sizing */}
                 <div className="flex items-center justify-center">
                    {React.isValidElement(item.icon) 
                        ? React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "h-5 w-5 flex-shrink-0" }) 
                        : item.icon}
                 </div>
                {!collapsed && <span>{item.label}</span>}
                {active && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-300 shadow-glow animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-slate-100 bg-gray-50/50">
          <button
            onClick={logout}
            className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ${
              collapsed ? "justify-center" : "justify-start"
            }`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-4 sticky top-0 z-10 text-slate-800 shadow-sm dark:shadow-slate-900/50">
          <div className="flex items-center gap-4">
             {/* Mobile Menu Trigger */}
             <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
               <SheetTrigger asChild>
                 <button className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-500">
                   <IconMenu className="h-6 w-6" />
                 </button>
               </SheetTrigger>
               <SheetContent side="left" className="w-64 p-0 bg-white border-r">
                 <div className="h-full flex flex-col">
                    {/* Sheet Header / Brand */}
                    <div className="h-20 flex items-center justify-center border-b border-slate-100 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
                            G
                          </div>
                          <div>
                            <div className="text-base font-bold text-slate-800 tracking-tight">GrowCode</div>
                            <div className="text-xs text-slate-500 font-medium tracking-wide uppercase">Employee Panel</div>
                          </div>
                        </div>
                    </div>
                    
                    {/* Sheet Nav */}
                    <nav className="flex-1 px-4 space-y-2">
                      {NAV.map((item) => {
                        const active = location.pathname === item.to;
                        return (
                          <Link
                            key={item.key}
                            to={item.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                active
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                             <div className="flex items-center justify-center">
                                {React.isValidElement(item.icon) 
                                    ? React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "h-5 w-5 flex-shrink-0" }) 
                                    : item.icon}
                             </div>
                             <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </nav>

                    {/* Sheet Logout */}
                    <div className="p-4 border-t border-slate-100 bg-gray-50/50 mt-auto">
                      <button
                        onClick={() => {
                            logout();
                            setMobileMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        <span>Logout</span>
                      </button>
                    </div>
                 </div>
               </SheetContent>
             </Sheet>

             {/* Desktop Title / Mobile Title Group */}
             <div>
               <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800">{user?.name || "Employee"}</h2>
               <p className="text-xs text-slate-500 font-medium mt-0.5 hidden sm:block">Overview of recent activity</p>
             </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
             {/* Search - Hidden on mobile for space */}


            <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition-colors" title="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen((s) => !s)}
                className="flex items-center gap-2 rounded-full p-0.5 hover:ring-2 hover:ring-indigo-500/50 transition-all"
                aria-expanded={userMenuOpen}
              >
                <Avatar className="h-10 w-10 ring-2 ring-white shadow-lg shadow-indigo-500/20 transition-transform duration-200 group-hover:scale-105">
                  {profileImageUrl ? (
                    <img src={profileImageUrl} alt={user?.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-sm tracking-wide shadow-inner">
                      {getInitials(user?.name || "U")}
                    </div>
                  )}
                </Avatar>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0F172A] border border-slate-800 rounded-xl shadow-xl z-40 py-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-slate-800 mb-1">
                      <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <Link to="/employee/settings" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Settings</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto bg-white p-4 md:p-8 scroll-smooth transition-colors duration-300">
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}