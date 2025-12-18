import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avtar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/Table";
import { Plus } from "lucide-react";
import CreateUserModal from "@/components/admin/CreateUserModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type User = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  createdAt?: string;
};

const formatDate = (date?: string) => {
  if (!date) return "-";
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

const isTodayOrYesterday = (date?: string) => {
  if (!date) return false;
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return (
    d.toDateString() === today.toDateString() ||
    d.toDateString() === yesterday.toDateString()
  );
};

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/employee`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (isMounted) {
          setUsers(res.data.data || res.data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const activeUsers = users.filter((u) => u.isActive);
  const recentActiveUsers = activeUsers.filter((u) =>
    isTodayOrYesterday(u.createdAt)
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="p-6">
          <p>Total Employees</p>
          <p className="text-3xl font-semibold">{users.length}</p>
        </Card>

        <Card className="p-6">
          <p>Active Employees</p>
          <p className="text-3xl font-semibold">{activeUsers.length}</p>
        </Card>

        <Card className="p-6">
          <p>Inactive Employees</p>
          <p className="text-3xl font-semibold">
            {users.length - activeUsers.length}
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Active Employees</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentActiveUsers.map((u) => (
                <TableRow key={u._id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <img src="/logo.png" />
                    </Avatar>
                    {u.name} {u.surname}
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{formatDate(u.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}
