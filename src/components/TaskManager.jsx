import { useState, useEffect } from "react";

function TaskManager({ tasks, setTasks }) {
  const [task, setTask] = useState("");
  // const [tasks, setTasks] = useState([]);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      dueDate: dueDate || null,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setDueDate("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const sortedTasks = [...tasks].sort((a, b) => {
  if (!a.dueDate) return 1;
  if (!b.dueDate) return -1;
  return new Date(a.dueDate) - new Date(b.dueDate);
  });

function getDueStatus(task) {
  if (!task.dueDate) return { label: "", color: "gray" };

  const today = new Date().setHours(0, 0, 0, 0);

  // FIX: parse date as local, not UTC
  const [year, month, day] = task.dueDate.split("-");
  const due = new Date(year, month - 1, day).setHours(0, 0, 0, 0);

  const diff = (due - today) / (1000 * 60 * 60 * 24);
  const base = `(Due: ${task.dueDate})`;

  if (task.completed) return { label: `Completed ${base}`, color: "green" };
  if (diff < 0) return { label: `Overdue ${base}`, color: "red" };
  if (diff === 0) return { label: `Due Today ${base}`, color: "orange" };
  if (diff === 1) return { label: `Due Tomorrow ${base}`, color: "orange" };

  return { label: `Due in ${diff} days ${base}`, color: "gray" };
}

  return (
    <div>
      <h2>Tasks</h2>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {sortedTasks.map((t) => (
          <li key={t.id}>

            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />

            <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
              {t.text}
            </span>

            {t.dueDate && (
                <span style={{ color: getDueStatus(t).color }}>
                  ({getDueStatus(t).label})
                </span>
            )}
            <button onClick={() => deleteTask(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
