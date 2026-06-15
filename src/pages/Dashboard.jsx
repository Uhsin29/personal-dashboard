import Counter from "../components/Counter";
import Weather from "../components/Weather";
import Notes from "../components/Notes";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Counter />
      <Weather />
      <Notes />
    </div>
  );
}

export default Dashboard;
