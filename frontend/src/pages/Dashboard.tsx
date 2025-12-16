import CreateTaskForm from "../components/CreateTaskForm";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Task Dashboard</h1>
      <CreateTaskForm />
      {/* Later: <TaskList /> */}
    </div>
  );
}