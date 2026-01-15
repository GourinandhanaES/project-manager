import { Trash2 } from "lucide-react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const TaskList = ({ tasks, onUpdate }) => {
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("Todo");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const addTask = () => {
    if (!taskName.trim()) return;
    const newTask = {
      id: uuid(),
      name: taskName,
      status: taskStatus,
      description: taskDescription,
      assignedTo: assignedTo || "Unassigned",
    };
    onUpdate([...tasks, newTask]);
    setTaskName("");
    setTaskDescription("");
    setAssignedTo("");
    setTaskStatus("Todo");
    setModalOpen(false); 
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    onUpdate(filteredTasks);
  };

  const updateStatus = (id, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    onUpdate(updatedTasks);
  };

  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const progress = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      {/* Header with Add button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold dark:text-gray-300">
          Tasks ({tasks.length}) - Completion: {progress}%
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-purple-600 text-white px-4 py-1 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg dark:text-gray-300 font-semibold mb-4">Add New Task</h3>
            <input
              placeholder="Task name"
              className="border p-2 rounded w-full mb-3"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              placeholder="Description"
              className="border p-2 rounded w-full mb-3"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <input
              placeholder="Assigned To"
              className="border p-2 rounded w-full mb-3"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
            <select
              className="border p-2 rounded w-full mb-4"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-1 border rounded dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="bg-purple-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No tasks added yet</p>
      ) : (
        <ul className="space-y-5">
          {tasks.map((task) => (
            <li key={task.id} className="border-2 border-gray-300 p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between gap-2 dark:text-gray-100" >
              <div>
                   <span className="font-medium">{task.name}</span>
                <p className="text-gray-500 text-sm dark:text-gray-300">{task.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                  className="border rounded p-1 dark:text-gray-900"
                >
                  <option>Todo</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
                <Trash2
                  onClick={() => deleteTask(task.id)}
                  className="w-5 h-5 text-red-600 cursor-pointer"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
