import { useEffect, useState } from "react";
import { getSocket } from "../lib/socket";
import type { Task } from "../api/tasks";

let notificationId = 0;

export default function NotificationManager() {
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string; taskId: string }>>([]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleAssignment = (task: Task) => {
      const message = `You were assigned to task: "${task.title}"`;
      const id = notificationId++;
      setNotifications(prev => [...prev, { id, message, taskId: task.id }]);

      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
    };

    socket.on("task:assigned", handleAssignment);

    return () => {
      socket.off("task:assigned", handleAssignment);
    };
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map(n => (
        <div
          key={n.id}
          className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs"
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}