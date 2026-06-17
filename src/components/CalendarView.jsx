import { useState } from "react";

function CalendarView({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of the month
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay(); // 0 = Sunday

  // Number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build array of days
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // ⭐ FIXED: Match TaskManager's local date parsing
  function getTasksForDay(day) {
    // Calendar cell date (local)
    const cellDate = new Date(year, month, day).setHours(0, 0, 0, 0);

    return tasks.filter((t) => {
      if (!t.dueDate) return false;

      // Parse task date as local (same fix as TaskManager)
      const [y, m, d] = t.dueDate.split("-");
      const taskDate = new Date(y, m - 1, d).setHours(0, 0, 0, 0);

      return taskDate === cellDate;
    });
  }

  // Navigation
  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  return (
    <div>
      <h2>
        <button onClick={prevMonth}>◀</button>
        {currentDate.toLocaleString("default", { month: "long" })} {year}
        <button onClick={nextMonth}>▶</button>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
        {/* Weekday labels */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} style={{ fontWeight: "bold", textAlign: "center" }}>{d}</div>
        ))}

        {/* Empty cells before month starts */}
        {Array.from({ length: startingDay }).map((_, i) => (
          <div key={"empty-" + i}></div>
        ))}

        {/* Days */}
        {days.map((day) => {
          const dayTasks = getTasksForDay(day);
          const isToday =
            new Date().toDateString() ===
            new Date(year, month, day).toDateString();

          return (
            <div
              key={day}
              style={{
                border: "1px solid #ccc",
                padding: "5px",
                background: isToday ? "#ffeeba" : "white",
                minHeight: "70px",
              }}
            >
              <strong>{day}</strong>

              {dayTasks.length > 0 && (
                <ul style={{ paddingLeft: "15px", marginTop: "5px" }}>
                  {dayTasks.map((t) => (
                    <li key={t.id} style={{ fontSize: "0.8rem" }}>
                      {t.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarView;
