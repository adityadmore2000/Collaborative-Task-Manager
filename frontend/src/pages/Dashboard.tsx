import CreateTaskForm from "../components/CreateTaskForm";
import UserDashboard from "../components/UserDashboard";

export default function Dashboard() {
  return (
    <div className="p-4 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Your Task Dashboard</h1>
      
      <CreateTaskForm />
      
      <UserDashboard />
    </div>
  );
}