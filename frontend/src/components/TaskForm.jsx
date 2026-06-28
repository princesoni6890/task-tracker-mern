import { useState, useEffect } from "react";
import API from "../services/api";

function TaskForm({ fetchTasks, editTask, setEditTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setStatus(editTask.status);
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editTask) {
        response = await API.put(`/${editTask._id}`, {
          title,
          description,
          status,
        });

        alert("Task Updated Successfully ✅");
        setEditTask(null);
      } else {
        response = await API.post("/", {
          title,
          description,
          status,
        });

        alert("Task Added Successfully ✅");
      }

      console.log(response.data);

      fetchTasks();

      setTitle("");
      setDescription("");
      setStatus("Pending");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="card shadow p-4">
      <h4 className="mb-3">
        {editTask ? "Update Task" : "Add New Task"}
      </h4>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <select
          className="form-select mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          {editTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;