import { Navigate, Outlet } from "react-router-dom";

export default function EmployeeProtectedRoute() {
  const token = localStorage.getItem("employeeToken");

  if (!token) {
    return <Navigate to="/employee/login" replace />;
  }

  return <Outlet />;
}
