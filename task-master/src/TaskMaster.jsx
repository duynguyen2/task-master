import { React, useState, useEffect } from "react";

const TaskMaster = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if(!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? {...t, completed: !t.completed} : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">📝 Task Master</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border rounded p-2 w-64"
          type="text"
          value={newTask}
          placeholder="Add a new task..."
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <ul className="w-80" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-white p-3 rounded mb-2 shadow"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4"
              />
              <span
                className={`${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
            </label>
            <button
              className="color-red text-red-500 hover:text-red-700"
              onClick={() => deleteTask(task.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default TaskMaster;