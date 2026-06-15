import TaskManager from "../components/TaskManager";
import CalendarView from "../components/CalendarView";

function TaskPage() {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskManager />
      <CalendarView tasks={[]} />
    </div>
  );
}

export default TaskPage;