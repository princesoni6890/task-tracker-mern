import { useEffect, useState } from "react";
import API from "./services/api";

import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      const response = await API.get("/");
      setTasks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <TaskForm
          fetchTasks={fetchTasks}
          editTask={editTask}
          setEditTask={setEditTask}
        />

        <hr />

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="row mb-4">

          <div className="col-md-4 mb-3">
            <div className="card bg-primary text-white shadow">
              <div className="card-body text-center">
                <h5>Total Tasks</h5>
                <h2>{totalTasks}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card bg-success text-white shadow">
              <div className="card-body text-center">
                <h5>Completed</h5>
                <h2>{completedTasks}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card bg-warning shadow">
              <div className="card-body text-center">
                <h5>Pending</h5>
                <h2>{pendingTasks}</h2>
              </div>
            </div>
          </div>

        </div>

        <TaskList
          tasks={filteredTasks}
          fetchTasks={fetchTasks}
          setEditTask={setEditTask}
        />

        <footer className="text-center mt-5 mb-3 text-secondary">
          Made with ❤️ using MERN Stack
        </footer>

      </div>
    </>
  );
}

export default App;