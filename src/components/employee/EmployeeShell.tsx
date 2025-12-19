import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Menu,
  LogOut,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avtar";

export default function EmployeeShell() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const rawUser = localStorage.getItem("employeeUser");
  let user: any = null;

  if (rawUser && rawUser !== "undefined") {
    try {
      user = JSON.parse(rawUser);
    } catch {
      user = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("employeeUser");
    navigate("/employee/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`border-r bg-white transition-all duration-200 ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <div>
              <p className="font-semibold">GrowCode</p>
              <p className="text-xs text-slate-500">Employee Panel</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-slate-100"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        <nav className="p-2 space-y-1">
          <NavLink
            to="/employee"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                isActive
                  ? "bg-sky-50 text-sky-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <LayoutDashboard className="h-5 w-5" />
            {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink
            to="/employee/tracker"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                isActive
                  ? "bg-sky-50 text-sky-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <ClipboardList className="h-5 w-5" />
            {!collapsed && "Tracker"}
          </NavLink>
        </nav>

        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <img src="/logo.png" alt="Employee" />
            </Avatar>

            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {user?.name || "Employee"}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.email || ""}
                </p>
              </div>
            )}

            <Button
              variant="ghost"
              className="text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">Employee dashboard</h2>
            <p className="text-sm text-slate-500">
              Overview of your activity
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-slate-600" />
            <Avatar className="h-8 w-8">
              <img src="/logo.png" alt="Employee" />
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
