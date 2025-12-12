// src/pages/admin/AdminDashboard.tsx
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
// import { Progress } from "@/components/ui/Progress";
import { Avatar } from "@/components/ui/Avtar";
import { Users, DollarSign, Activity } from "lucide-react";
// import AdminLayout from "@/components/admin/AdminLayout";

function StatCard({ title, value, delta, icon }: { title: string; value: string; delta?: string; icon?: React.ReactNode; }) {
  return (
    <Card className="p-4">
      <CardHeader className="flex items-start justify-between gap-4 p-0">
        <div>
          <div className="text-sm font-medium text-slate-500">{title}</div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="text-2xl font-semibold text-slate-900">{value}</div>
            {delta && <div className="text-sm text-emerald-600">+{delta}</div>}
          </div>
        </div>
        <div className="rounded-md bg-slate-50 p-2 text-slate-600">{icon}</div>
      </CardHeader>
      <CardContent className="pt-3">
      
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const recentUsers = [
    { name: "Kiran Patel", email: "kiran@growcode.com", avatar: "/logo.png" },
    { name: "Anita Desai", email: "anita@growcode.com", avatar: "/logo.png" },
    { name: "Rohit Kumar", email: "rohit@growcode.com", avatar: "/logo.png" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active users" value="1,248" delta="8.4%" icon={<Users className="h-5 w-5" />} />
        <StatCard title="New signups" value="89" delta="4.1%" icon={<Activity className="h-5 w-5" />} />
        <StatCard title="Revenue" value="$12,430" delta="6.2%" icon={<DollarSign className="h-5 w-5" />} />
        <Card className="p-4">
          <CardHeader className="p-0">
            <div className="text-sm font-medium text-slate-500">Quick actions</div>
          </CardHeader>
          <CardContent className="pt-3 flex flex-col gap-3">
            <Button className="w-full">Create user</Button>
            <Button variant="outline" className="w-full">Export CSV</Button>
          </CardContent>
        </Card>
      </div>

      {/* Main grid: recent activity + users */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Recent activity</h3>
                <div className="text-xs text-slate-500">Last 7 days</div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium">Deployment succeeded</div>
                    <div className="text-xs text-slate-500">Production — 2 hours ago</div>
                  </div>
                  <div className="text-xs text-slate-400">OK</div>
                </li>

                <li className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium">New user signup</div>
                    <div className="text-xs text-slate-500">marketing campaign — yesterday</div>
                  </div>
                  <div className="text-xs text-emerald-600">+32</div>
                </li>

                <li className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium">Payment processed</div>
                    <div className="text-xs text-slate-500">Order #1241 — 3 days ago</div>
                  </div>
                  <div className="text-xs text-slate-400">$450</div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <aside>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Recent users</h3>
                <div className="text-xs text-slate-500">Just now</div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recentUsers.map((u) => (
                  <li key={u.email} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <img src={u.avatar} alt={u.name} />
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.email}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
