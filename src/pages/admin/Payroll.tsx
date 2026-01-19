import { useEffect, useState, useMemo } from "react";
import { api } from "@/lib/axios";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { IndianRupee, Clock, Users } from "lucide-react";

type SalaryRow = {
  employeeId: string;
  name: string;
  baseSalary: number | null;
  monthlyWorkingHours: number | null; // configured in user profile
  effectiveMonthlyHours: number | null; // used for calculation
  workedHours: number; // 🔥 FROM TRACKER
  salary?: number;
  paidLeaveCount?: number;
  unpaidLeaveCount?: number;
  salaryConfigured: boolean;
};

export default function Payroll() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [rows, setRows] = useState<SalaryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [targetHours, setTargetHours] = useState<string>("176"); // Default 22 days * 8 hours
  const [extraHours, setExtraHours] = useState<Record<string, string>>({});

  const addExtraHours = async (employeeId: string) => {
    const hours = Number(extraHours[employeeId]);
    if (!hours || hours <= 0) return;

    try {
      await api.post(`/api/v1/salary/extra-hours`, {
        employeeId,
        month,
        hours,
        reason: "Admin manual adjustment",
      });

      setExtraHours((p) => ({ ...p, [employeeId]: "" }));
      fetchPayroll();
    } catch (err) {
      console.error("Failed to add extra hours", err);
    }
  };

  const removeExtraHours = async (employeeId: string) => {
    const hours = Number(extraHours[employeeId]);
    if (!hours || hours <= 0) return;

    try {
      await api.post(`/api/v1/salary/remove-extra-hours`, {
        employeeId,
        month,
        hours,
        reason: "Admin manual removal",
      });

      setExtraHours((p) => ({ ...p, [employeeId]: "" }));
      fetchPayroll();
    } catch (err) {
      console.error("Failed to remove extra hours", err);
    }
  };

  const fetchPayroll = async () => {
    setLoading(true);
    try {
      /* ================= 1️⃣ EMPLOYEES ================= */
      const usersRes = await api.get(`/api/v1/employee`);
      const employees = usersRes.data.data || [];

      /* ================= 2️⃣ SALARY CONFIG + FINAL MERGE ================= */
      const payrollRows: SalaryRow[] = await Promise.all(
        employees.map(async (emp: any) => {
          // Pass targetHours to backend to override user config if needed
          const salaryRes = await api.get(
            `/api/v1/salary/monthly/admin?employeeId=${emp._id}&month=${month}&targetHours=${targetHours || ""}`
          );

          return {
            employeeId: emp._id,
            name: salaryRes.data.name || emp.name,
            baseSalary: salaryRes.data.baseSalary ?? null,
            monthlyWorkingHours: salaryRes.data.monthlyWorkingHours ?? null,
            effectiveMonthlyHours: salaryRes.data.effectiveMonthlyHours ?? null,
            workedHours: salaryRes.data.trackerHours || 0, // 🔥 USER REQUEST: Show Tracker Hours here
            paidLeaveCount: salaryRes.data.paidLeaveCount || 0,
            unpaidLeaveCount: salaryRes.data.unpaidLeaveCount || 0,
            salary: salaryRes.data.salary,
            salaryConfigured: salaryRes.data.salaryConfigured,
          };
        })
      );

      setRows(payrollRows);
    } catch (err) {
      console.error("Payroll fetch failed", err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, [month, targetHours]); // Re-fetch when target hours change

  // Summary Metrics
  const totalPayout = useMemo(
    () => rows.reduce((acc, r) => acc + (r.salary || 0), 0),
    [rows]
  );
  
  


  return (
    <div className="space-y-6">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payroll Management</h2>
          <p className="text-muted-foreground text-sm">
            Manage monthly salaries and adjustments
          </p>
        </div>

        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border rounded-md px-3 py-1.5 shadow-sm">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                    Standard Hours
                </span>
                <Input
                    type="number"
                    value={targetHours}
                    onChange={(e) => setTargetHours(e.target.value)}
                    className="w-20 h-8 text-right font-mono border-none focus-visible:ring-0 px-0 bg-transparent"
                    placeholder="176"
                />
            </div>
            
            <div className="flex items-center gap-2 bg-white border rounded-md px-3 py-1.5 shadow-sm">
                 <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                    Month
                </span>
                <Input
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-36 h-8 border-none focus-visible:ring-0 px-0 bg-transparent"
                />
            </div>
          
            <Button onClick={fetchPayroll} size="sm" variant="outline">
                Refresh
            </Button>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
          <Input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-40 h-9 bg-transparent border-0 focus-visible:ring-0 text-slate-700 font-medium"
          />
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-indigo-100">Total Payout</h3>
            <IndianRupee className="h-4 w-4 text-indigo-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ {totalPayout.toLocaleString()}</div>
            <p className="text-xs text-indigo-200 mt-1">For {new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-slate-500">Total Employees</h3>
                <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{rows.length}</div>
                <p className="text-xs text-slate-400 mt-1">Active in current month</p>
            </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm bg-white">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-slate-500">Global Target Hours</h3>
                 <Clock className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                 <div className="flex items-center gap-2">
                     <Input 
                        value={targetHours} 
                        onChange={(e) => setTargetHours(e.target.value)} 
                        className="h-8 w-24 text-lg font-bold border-0 p-0 bg-transparent focus-visible:ring-0 text-slate-900" 
                     />
                     <span className="text-xs text-slate-400">/ month</span>
                 </div>
                 <p className="text-xs text-slate-400 mt-1">Updates calculation for all</p>
            </CardContent>
        </Card>
      </div>

      {/* PAYROLL TABLE */}
      <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 border-slate-100">
                <TableHead className="w-[200px] uppercase text-xs font-semibold tracking-wider text-slate-500 pl-6">Employee</TableHead>
                <TableHead className="uppercase text-xs font-semibold tracking-wider text-slate-500">Base Salary</TableHead>
                <TableHead className="uppercase text-xs font-semibold tracking-wider text-slate-500">Target Hrs</TableHead>
                <TableHead className="uppercase text-xs font-semibold tracking-wider text-slate-500">Worked Hrs</TableHead>
                <TableHead className="uppercase text-xs font-semibold tracking-wider text-slate-500">Paid Leave</TableHead>
                <TableHead className="uppercase text-xs font-semibold tracking-wider text-slate-500">Unpaid Leave</TableHead>
                <TableHead className="uppercase text-xs font-semibold tracking-wider text-slate-500">Adjust Hours</TableHead>
                <TableHead className="text-right uppercase text-xs font-semibold tracking-wider text-slate-500 pr-6">Final Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                 <TableRow>
                    <TableCell colSpan={8} className="h-48 text-center text-slate-400">Loading payroll data...</TableCell>
                 </TableRow>
              ) : rows.length === 0 ? (
                 <TableRow>
                     <TableCell colSpan={8} className="h-48 text-center text-slate-400">No data for this month</TableCell>
                 </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.employeeId} className="group hover:bg-slate-50 transition-colors border-slate-100">
                    <TableCell className="font-medium text-slate-900 pl-6">
                      {row.name}
                      <div className="text-xs font-normal text-slate-400 mt-0.5">
                         {row.salaryConfigured ? <span className="text-emerald-500">Configured</span> : <span className="text-amber-500">Salary Not Set</span>}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      ₹ {row.baseSalary?.toLocaleString() ?? 0}
                    </TableCell>
                    <TableCell className="text-slate-500">
                        {row.effectiveMonthlyHours} h
                    </TableCell>
                    <TableCell>
                         <div className="flex flex-col">
                            <span className="font-semibold text-slate-700">{row.workedHours.toFixed(2)} h</span>
                            <span className="text-xs text-slate-400">Tracker Logged</span>
                         </div>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {row.paidLeaveCount ?? 0}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {row.unpaidLeaveCount ?? 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Hours"
                          className="h-8 w-20 bg-white border-slate-200 text-slate-700"
                          value={extraHours[row.employeeId] || ""}
                          onChange={(e) =>
                            setExtraHours((prev) => ({
                              ...prev,
                              [row.employeeId]: e.target.value,
                            }))
                          }
                        />
                        <div className="flex flex-col gap-1">
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-5 text-[10px] px-2 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                onClick={() => addExtraHours(row.employeeId)}
                            >
                                + Add
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-5 text-[10px] px-2 text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => removeExtraHours(row.employeeId)}
                            >
                                - Rem
                            </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <span className="inline-block px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">
                        ₹ {row.salary?.toLocaleString() ?? 0}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
