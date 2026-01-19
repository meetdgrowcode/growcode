// src/components/admin/AdminLayout.tsx
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu as IconMenu,
  Home,
  Users,
  LogOut,
  Bell,
  Search,
  X,
  Clock,
  DollarSign,
  Briefcase,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import type { JSX } from "react/jsx-runtime";

type NavItem = {
  key: string;
  label: string;
  to: string;
  icon: React.ReactNode;
};



const NAV: NavItem[] = [
  { key: "home", label: "Overview", to: "/admin", icon: <Home className="h-5 w-5" /> },
  { key: "users", label: "Users", to: "/admin/users", icon: <Users className="h-5 w-5" /> },
  { key: "projects", label: "Projects", to: "/admin/projects", icon: <Briefcase className="h-5 w-5" /> }, // New Project Link
  { key: "tracker", label: "Tracker", to: "/admin/tracker", icon: <Clock className="h-5 w-5" /> }, // ← New Tracker link with Clock icon
  { key: "payroll", label: "Payroll", to: "/admin/payroll", icon: <DollarSign className="h-5 w-5" /> },
];

export default function AdminLayout(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false); // mobile drawer open
  const [collapsed, setCollapsed] = useState<boolean>(false); // sidebar collapsed (desktop)

  const navigate = useNavigate();
  const location = useLocation();

  // Load collapse state from localStorage
  useEffect(() => {
    try {
      const v = localStorage.getItem("admin_sidebar_collapsed");
      if (v === "1") setCollapsed(true);
    } catch {
      /* ignore */
    }
  }, []);

  // Persist collapse state
  useEffect(() => {
    try {
      localStorage.setItem("admin_sidebar_collapsed", collapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  // Basic auth guard
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token && location.pathname !== "/admin/signin") {
      navigate("/admin/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = (): void => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    navigate("/admin/signin");
  };

  function NavLinks(props: { onClick?: () => void }): JSX.Element {
    const { onClick } = props;
    return (
      <nav className="mt-6 flex flex-col gap-1">
        {NAV.map((n) => {
          const isActive = location.pathname === n.to;
          return (
            <Link
              key={n.key}
              to={n.to}
              onClick={onClick}
              title={collapsed ? n.label : undefined}
              className={
                (isActive
                  ? "bg-sky-50 text-sky-700 ring-1 ring-sky-100"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900") +
                " group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition"
              }
            >
              <span
                className={
                  (isActive ? "text-sky-600" : "text-slate-400") + " group-hover:text-slate-700"
                }
              >
                {n.icon}
              </span>

              {/* only show label when not collapsed */}
              {!collapsed && <span className="truncate">{n.label}</span>}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside
        className={
          "hidden md:flex md:flex-col border-r border-slate-200 bg-white text-slate-600 transition-all duration-300 ease-in-out shadow-xl z-20 " +
          (collapsed ? "md:w-20" : "md:w-72")
        }
      >
        {/* TOP: Logo & Toggle */}
        <div className="flex items-center justify-between px-4 py-5 h-20 border-b border-slate-100">
          {collapsed ? (
             <div className="mx-auto">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                  G
                </div>
             </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30">
                  G
                </div>
                <div>
                  <div className="text-base font-bold text-slate-800 tracking-tight">GrowCode</div>
                  <div className="text-xs text-slate-500 font-medium tracking-wide uppercase">Admin Panel</div>
                </div>
              </div>
            </>
          )}
           {!collapsed && (
              <button
                onClick={() => setCollapsed(true)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
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

        {/* NAV LINKS */}
        <div className="px-3 py-6 flex-1 overflow-y-auto scrollbar-hide">
           <nav className="flex flex-col gap-1.5">
            {NAV.map((n) => {
              const isActive = location.pathname === n.to;
              return (
                <Link
                  key={n.key}
                  to={n.to}
                  title={collapsed ? n.label : undefined}
                  className={
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 " +
                    (isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-1 ring-indigo-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900") +
                      (collapsed ? " justify-center" : "")
                  }
                >
                  <span
                    className={
                      (isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600") + 
                      " transition-colors"
                    }
                  >
                    {/* Clone element to enforce size if needed, or just render */}
                    {n.icon}
                  </span>

                  {/* only show label when not collapsed */}
                  {!collapsed && <span className="truncate">{n.label}</span>}
                  
                  {isActive && !collapsed && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-300 shadow-glow animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM: User Profile */}
        <div className="mt-auto border-t border-slate-100 p-4 bg-gray-50/50">
          {collapsed ? (
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-9 w-9 ring-2 ring-white shadow-sm">
                <img src="/logo.png" alt="Admin" />
              </Avatar>
               <button
                onClick={handleLogout}
                className="rounded-lg p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                <img src="/logo.png" alt="Admin" />
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-800 truncate">Administrator</div>
                <div className="text-xs text-slate-500 truncate">admin@growcode.com</div>
              </div>

              <Button onClick={handleLogout} variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        {/* Mobile Topbar */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
             <button onClick={() => setOpen(true)} className="p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600">
                <IconMenu className="h-6 w-6" />
             </button>
             <span className="font-bold text-gray-800 tracking-tight">GrowCode Admin</span>
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
        </header>

        {/* Mobile Drawer */}
        {open && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

            <div className="relative z-50 w-72 h-full bg-[#0F172A] shadow-2xl flex flex-col transform transition-transform duration-300">
              <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <span className="text-lg font-bold text-white">GrowCode</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4">
                 <nav className="space-y-1">
                    {NAV.map((n) => (
                         <Link
                          key={n.key}
                          to={n.to}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                              location.pathname === n.to 
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" 
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          {n.icon}
                          {n.label}
                        </Link>
                    ))}
                 </nav>
              </div>

              <div className="p-4 border-t border-slate-800 bg-[#0B1120]">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-slate-700">
                        <img src="/logo.png" alt="Admin" />
                    </Avatar>
                    <div className="flex-1">
                        <div className="text-white font-medium text-sm">Admin</div>
                        <div className="text-slate-500 text-xs">admin@growcode.com</div>
                    </div>
                    <button onClick={() => { setOpen(false); handleLogout(); }} className="text-slate-400 hover:text-red-400">
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sticky Header */}
        <div className="hidden md:flex items-center justify-between border-b border-gray-200 bg-white/90 backdrop-blur-md px-8 py-4 sticky top-0 z-10 text-slate-800 shadow-sm">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800">Admin Dashboard</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Overview of ecosystem</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 border border-gray-200 bg-gray-50/50 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all w-64">
              <Search className="h-4 w-4 text-slate-400" />
              <input 
                placeholder="Search anything..." 
                className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400 text-slate-700" 
              />
            </div>
            


            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition-colors relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-white p-4 md:p-8 scroll-smooth">
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
              <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
