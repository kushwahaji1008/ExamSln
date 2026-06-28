import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./api";

export default function AdminDashboard() {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="p-4 bg-white border rounded">
        <h2 className="font-semibold mb-2">Users</h2>

        {users?.map((u: any) => (
          <div key={u.id} className="border-b p-2">
            {u.fullName} - {u.role}
          </div>
        ))}
      </div>
    </div>
  );
}
