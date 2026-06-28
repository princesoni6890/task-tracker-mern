import API from "../services/api";

function TaskList({ tasks, fetchTasks, setEditTask }) {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/${id}`);

      alert("Task Deleted Successfully ✅");

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mt-4">
     <h3 className="mb-4 fw-bold">
    📌 All Tasks
</h3>

      {tasks.length === 0 ? (
        <div className="alert alert-warning">
         😔 No Tasks Found
        </div>
      ) : (
        tasks.map((task) => (
          <div className="card shadow mb-3" key={task._id}>
            <div className="card-body">

              <h5>{task.title}</h5>

              <p>{task.description}</p>

              <span
                className={
                  task.status === "Completed"
                    ? "badge bg-success"
                    : task.status === "In Progress"
                    ? "badge bg-warning text-dark"
                    : "badge bg-secondary"
                }
              >
                {task.status}
              </span>

              <div className="mt-3 d-flex gap-2">

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => setEditTask(task)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;