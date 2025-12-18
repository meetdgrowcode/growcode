import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/Card";
const BASE_URL = import.meta.env.VITE_BASE_URL;

type Employee = {
  name?: string;
  email?: string;
  role?: string;
};

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("employeeToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEmployee(res.data);
      } catch (error) {
        console.log("Failed to load employee profile",error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-2xl font-bold">
        Welcome, {employee?.name || employee?.email || "Employee"} 👋
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="text-xl font-semibold">
              {employee?.role || "Employee"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
