import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/taskmanager">Task Manager</Link>
    </nav>
  );
}

export default Navbar;
