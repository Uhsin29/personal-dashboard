import { useState, useEffect } from "react";
import TaskManager from "../components/TaskManager";
import CalendarView from "../components/CalendarView";

function TaskPage() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage once
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <h1>Task Manager</h1>

      {/* Give TaskManager the ability to update tasks */}
      <TaskManager tasks={tasks} setTasks={setTasks} />

      {/* Calendar now receives REAL tasks */}
      <CalendarView tasks={tasks} />
    </div>
  );
}

export default TaskPage;
