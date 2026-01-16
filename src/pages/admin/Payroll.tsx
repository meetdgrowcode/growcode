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
  
  const totalEmployees = rows.length;
  const processedEmployees = rows.filter((r) => r.salaryConfigured).length;

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
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Total Payout</div>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPayout.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              For {new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <div className="text-sm font-medium">Standard Working Hours</div>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{targetHours || "-"} hrs</div>
             <p className="text-xs text-muted-foreground">
              Base for salary calculation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Processed Employees</div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {processedEmployees} / {totalEmployees}
            </div>
             <p className="text-xs text-muted-foreground">
              {totalEmployees - processedEmployees} pending configuration
            </p>
          </CardContent>
        </Card>
      </div>

      {/* MAIN TABLE */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead className="text-center">Effective Hrs</TableHead>
                <TableHead className="text-center">Worked Hrs</TableHead>
                <TableHead className="text-center">Leaves</TableHead>
                <TableHead>Adjustments</TableHead>
                <TableHead className="text-right">Final Salary</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                 <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Calculating payroll...
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No employees found for this period.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((r) => (
                  <TableRow key={r.employeeId}>
                    <TableCell>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {r.employeeId.slice(-4)}</div>
                    </TableCell>

                    <TableCell>
                      {r.baseSalary !== null ? `₹${r.baseSalary.toLocaleString()}` : <span className="text-destructive text-xs">Not Set</span>}
                    </TableCell>

                    <TableCell className="text-center">
                       <span className={r.effectiveMonthlyHours !== Number(targetHours) ? "text-orange-600 font-medium" : ""}>
                           {r.effectiveMonthlyHours || "-"}
                       </span>
                    </TableCell>

                    <TableCell className="text-center">
                        <div className="font-mono">{r.workedHours.toFixed(2)}</div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex flex-col text-xs">
                        <span className="text-green-600 font-medium">{r.paidLeaveCount || 0} Paid</span>
                        <span className="text-red-500">{r.unpaidLeaveCount || 0} Unpaid</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          placeholder="+hrs"
                          value={extraHours[r.employeeId] || ""}
                          onChange={(e) =>
                            setExtraHours((p) => ({
                              ...p,
                              [r.employeeId]: e.target.value,
                            }))
                          }
                          className="w-16 h-8 text-xs"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => addExtraHours(r.employeeId)}
                          disabled={!extraHours[r.employeeId]}
                          className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          Add
                        </Button>
                         <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeExtraHours(r.employeeId)}
                          disabled={!extraHours[r.employeeId]}
                          className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      {r.salaryConfigured ? (
                        <div className="font-bold text-green-700">
                             ₹{r.salary?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      ) : (
                        <div className="text-xs text-orange-500 font-medium">
                          Config Incomplete
                        </div>
                      )}
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
