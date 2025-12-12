// src/components/admin/AdminLayout.tsx
import React, {  useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  Home,
  Users,
  Layers,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avtar";



type NavItem = {
  key: string;
  label: string;
  to: string;
  icon: React.ReactNode;
};

const NAV: NavItem[] = [
  { key: "home", label: "Overview", to: "/admin", icon: <Home className="h-4 w-4" /> },
  { key: "users", label: "Users", to: "/admin/users", icon: <Users className="h-4 w-4" /> },
  { key: "projects", label: "Projects", to: "/admin/projects", icon: <Layers className="h-4 w-4" /> },
  { key: "settings", label: "Settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false); // mobile drawer
  const navigate = useNavigate();

  // Guard: if not logged in, redirect to sign-in
  React.useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/signin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
    navigate("/admin/signin");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-72 md:flex-col md:gap-6 md:py-8 md:px-5 border-r border-slate-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
            G
          </div>
          <div>
            <div className="text-sm font-semibold">GrowCode</div>
            <div className="text-xs text-slate-500">Admin panel</div>
          </div>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {NAV.map((n) => (
            <Link
              key={n.key}
              to={n.to}
              className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            >
              <span className="text-slate-400 group-hover:text-slate-700">{n.icon}</span>
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <img src="/logo.png" alt="avatar" />
          </Avatar>
          <div className="flex-1">
            <div className="text-sm font-medium">Admin</div>
            <div className="text-xs text-slate-500">you@company.com</div>
          </div>
          <button
            aria-label="Logout"
            onClick={handleLogout}
            className="rounded-full p-2 text-red-600 hover:bg-red-50"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-100 bg-white/95 px-4 py-3 md:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-md p-2 text-slate-700"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="font-semibold">GrowCode</div>
            <div className="text-xs text-slate-500">Admin</div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-md p-2" aria-label="Alerts">
              <Bell className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </header>

        {/* Mobile drawer: simple dialog */}
        {open && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <div>
                    <div className="text-sm font-semibold">GrowCode</div>
                    <div className="text-xs text-slate-500">Admin</div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-2 text-slate-700"
                >
                  ✕
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link
                    key={n.key}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <span className="text-slate-400">{n.icon}</span>
                    <span>{n.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-6">
                <Button onClick={() => { setOpen(false); handleLogout(); }} variant="ghost">Logout</Button>
              </div>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold">Admin dashboard</h2>
              <p className="text-sm text-slate-500">Overview of recent activity</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 rounded-md border border-slate-100 bg-white px-3 py-1">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  aria-label="Search"
                  placeholder="Search..."
                  className="w-56 bg-transparent text-sm outline-none"
                />
              </div>

              <button className="rounded-md p-2 hover:bg-slate-100" title="Notifications">
                <Bell className="h-5 w-5 text-slate-600" />
              </button>

              <div className="hidden md:block">
                <Avatar className="h-8 w-8">
                  <img src="/logo.png" alt="avatar" />
                </Avatar>
              </div>
            </div>
          </div>

          {/* Outlet for pages */}
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
