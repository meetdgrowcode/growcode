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
  X,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avtar";
import type { JSX } from "react/jsx-runtime";

/* ================= NAV ================= */
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

export default function EmployeeLayout(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false); // mobile drawer
  const [collapsed, setCollapsed] = useState<boolean>(false); // desktop collapse

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= LOAD COLLAPSE STATE ================= */
  useEffect(() => {
    try {
      const v = localStorage.getItem("employee_sidebar_collapsed");
      if (v === "1") setCollapsed(true);
    } catch (error){
      console.log("Failed to save sidebar status",error)
    }
  }, []);

  /* ================= SAVE COLLAPSE STATE ================= */
  useEffect(() => {
    try {
      localStorage.setItem("employee_sidebar_collapsed", collapsed ? "1" : "0");
    } catch(error){
      console.error("Failed to save sidebar state:", error);
    }
  }, [collapsed]);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    const token = localStorage.getItem("employeeToken");
    if (!token && location.pathname !== "/employee/login") {
      navigate("/employee/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /* ================= USER ================= */
  let user: any = null;
  const rawUser = localStorage.getItem("employeeUser");

  if (rawUser && rawUser !== "undefined") {
    try {
      user = JSON.parse(rawUser);
    } catch {
      user = null;
    }
  }

  /* ================= LOGOUT ================= */
  const handleLogout = (): void => {
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("employeeUser");
    navigate("/employee/login");
  };

  /* ================= NAV LINKS ================= */
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
                  (isActive ? "text-sky-600" : "text-slate-400") +
                  " group-hover:text-slate-700"
                }
              >
                {n.icon}
              </span>

              {!collapsed && <span className="truncate">{n.label}</span>}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={
          "hidden md:flex md:flex-col border-r border-slate-100 bg-white transition-all duration-200 " +
          (collapsed ? "md:w-20" : "md:w-72")
        }
      >
        {/* TOP */}
        <div className="flex items-center justify-between px-3 py-3">
          {collapsed ? (
            <button
              aria-label="Expand sidebar"
              onClick={() => setCollapsed(false)}
              className="rounded p-2 hover:bg-slate-100"
              title="Expand"
            >
              <IconMenu className="h-5 w-5 text-slate-600" />
            </button>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  G
                </div>
                <div>
                  <div className="text-sm font-semibold">GrowCode</div>
                  <div className="text-xs text-slate-500">Employee panel</div>
                </div>
              </div>

              <button
                aria-label="Collapse sidebar"
                onClick={() => setCollapsed(true)}
                className="rounded p-2 hover:bg-slate-100"
                title="Collapse"
              >
                <IconMenu className="h-5 w-5 text-slate-600" />
              </button>
            </>
          )}
        </div>

        {/* NAV */}
        <div className="px-2">
          <NavLinks />
        </div>

        {/* BOTTOM */}
        <div className="mt-auto px-2 py-4">
          {collapsed ? (
            <div className="flex flex-col items-center">
              <button
                aria-label="Logout"
                onClick={handleLogout}
                className="rounded-md p-2 hover:bg-red-50 text-red-600"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <img src="/logo.png" alt="Employee" />
              </Avatar>

              <div className="flex-1">
                <div className="text-sm font-medium">
                  {user?.name || "Employee"}
                </div>
                <div className="text-xs text-slate-500">
                  {user?.email || ""}
                </div>
              </div>

              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-red-600 p-2"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Topbar */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-white border-b px-4 py-3">
          <button onClick={() => setOpen(true)} className="p-2 rounded-md">
            <IconMenu className="h-5 w-5" />
          </button>

          <div className="font-semibold">GrowCode Employee</div>

          <button className="p-2 rounded-md">
            <Bell className="h-5 w-5" />
          </button>
        </header>

        {/* Mobile Drawer */}
        {open && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />

            <div className="relative z-50 w-72 h-full bg-white shadow-xl p-4 flex flex-col">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <div>
                    <div className="text-sm font-semibold">GrowCode</div>
                    <div className="text-xs text-slate-500">Employee</div>
                  </div>
                </div>

                <button onClick={() => setOpen(false)}>
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </div>

              <div className="mt-4 flex-1 overflow-y-auto">
                <NavLinks onClick={() => setOpen(false)} />
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <img src="/logo.png" alt="Employee" />
                  </Avatar>

                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {user?.name || "Employee"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {user?.email || ""}
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    variant="ghost"
                    className="text-red-600 p-2"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-base font-semibold leading-tight">
              Employee dashboard
            </h2>
            <p className="text-xs text-slate-500">Overview of your activity</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 border px-3 py-1 rounded-md bg-white">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                placeholder="Search..."
                className="bg-transparent text-sm outline-none w-56"
              />
            </div>

            <Bell className="h-5 w-5 text-slate-600" />
            <Avatar className="h-8 w-8">
              <img src="/logo.png" alt="Employee" />
            </Avatar>
          </div>
        </div>

        {/* Page Content */}
        <main
          className={
            "flex-1 overflow-y-auto p-4 md:p-8 transition-all duration-200 " +
            (collapsed ? "md:pl-6" : "md:pl-8")
          }
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
