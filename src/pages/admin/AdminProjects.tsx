import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import AddProjectModal from "@/components/admin/AddProjectModal";

type Project = {
  _id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await api.get("/api/v1/admin/projects");
      setProjects(res.data?.projects || []);
    } catch (err) {
      console.error("Fetch projects failed", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const toggleStatus = async (project: Project) => {
    try {
      const newStatus = project.status === "active" ? "inactive" : "active";
      await api.put(`/api/v1/admin/project/${project._id}`, { status: newStatus });
      fetchProjects();
    } catch (err) {
      console.error("Toggle status failed", err);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      setLoadingId(id);
      await api.delete(`/api/v1/admin/project/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Delete project failed", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center bg-white rounded-t-xl">
        <span className="font-semibold text-lg text-slate-800">
          Projects ({projects.length})
        </span>
        <Button onClick={() => setCreateOpen(true)} className="flex gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </CardHeader>

      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="w-[40%]">Project Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  No projects found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((p) => (
                <TableRow key={p._id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-900">{p.name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        p.status === "active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {p.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      variant={p.status === "active" ? "outline" : "default"}
                      onClick={() => toggleStatus(p)}
                      className={`h-10 px-4 gap-2 font-medium transition-all ${
                        p.status === "active" 
                        ? "border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800" 
                        : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {p.status === "active" ? (
                        <>
                          <ToggleRight className="h-5 w-5" /> Active
                        </>
                      ) : (
                         <>
                          <ToggleLeft className="h-5 w-5" /> Inactive
                        </>
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={loadingId === p._id}
                      onClick={() => deleteProject(p._id)}
                      className="h-10 px-4 gap-2 font-medium"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {createOpen && (
        <AddProjectModal
          onClose={() => setCreateOpen(false)}
          onSuccess={fetchProjects}
        />
      )}
    </Card>
  );
}
