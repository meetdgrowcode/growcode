import { Route } from "react-router-dom";
import EmployeeProtectedRoute from "./EmployeeProtectedRoute";

import EmployeeLayout from "@/layouts/EmployeeLayout";
import EmployeeDashboard from "@/pages/employee/EmployeeDashboard";

export default function EmployeeRoutes() {
  return (
    <Route element={<EmployeeProtectedRoute />}>
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route index element={<EmployeeDashboard />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
      </Route>
    </Route>
  );
}
