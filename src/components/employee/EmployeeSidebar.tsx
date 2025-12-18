import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";

const links = [
  {
    label: "Dashboard",
    to: "/employee/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Employees",
    to: "/employee/employees",
    icon: Users,
  },
  {
    label: "Profile",
    to: "/employee/profile",
    icon: User,
  },
];

function SidebarContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-6 py-5 text-xl font-semibold">
        Employee Panel
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        <Button variant="outline" className="w-full gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default function EmployeeSidebar() {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 border-r bg-background md:block">
        <SidebarContent />
      </aside>

      {/* Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-50 md:hidden"
          >
            ☰
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
