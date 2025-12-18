import { Outlet } from "react-router-dom";
import EmployeeSidebar from "@/components/employee/EmployeeSidebar";
import EmployeeHeader from "@/components/employee/EmployeeHeader";

export default function EmployeeLayout() {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <EmployeeSidebar />

      <div className="flex flex-1 flex-col">
        <EmployeeHeader />

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
