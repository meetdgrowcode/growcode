import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

export default function AdminProtectedRoute(): JSX.Element {
  const token = localStorage.getItem("admin_token");
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/admin/signin"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
