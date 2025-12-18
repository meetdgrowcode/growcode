import { Avatar } from "@/components/ui/Avtar";

export default function EmployeeHeader() {
  const employeeName = "Employee";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <h1 className="text-lg font-semibold">
        Employee Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium md:block">
          {employeeName}
        </span>
        <Avatar>
          
            {employeeName.charAt(0)}
          
        </Avatar>
      </div>
    </header>
  );
}
