import React, { useState, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";

const Todos = () => {
  const [tasks, setTasks] = useState([]);
  const { user, signOutUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = e.target.task.value.trim();
    const description = e.target.description.value.trim();

    if (!task) {
      alert("Task title is required!");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: task,
      description,
      category: "to-do",
    };

    setTasks([...tasks, newTask]);
    e.target.reset();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <div className="bg-blue-900 text-white flex justify-between items-center p-4 shadow-md">
          <div className="flex items-center gap-3">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border border-white"
              />
            )}
            <div>
              <h2 className="text-lg font-semibold">{user?.displayName}</h2>
              <p className="text-sm opacity-80">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white text-xl">
              <AiOutlineHome />
            </Link>
            <button
              onClick={signOutUser}
              className="flex items-center gap-1 bg-white text-blue-900 px-3 py-1 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Logout <FiLogOut />
            </button>
          </div>
        </div>

        {/* Task Input Section */}
        <div className="w-11/12 max-w-3xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Add Task</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="task"
              placeholder="Task Title"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <input
              type="text"
              name="description"
              placeholder="Task Description"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-900 transition"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Task Management Section */}
        <div className="w-11/12 max-w-5xl mx-auto mt-6">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
            Task Manager
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn
              title="To-Do"
              category="to-do"
              tasks={tasks}
              setTasks={setTasks}
            />
            <TaskColumn
              title="In Progress"
              category="in-progress"
              tasks={tasks}
              setTasks={setTasks}
            />
            <TaskColumn
              title="Completed"
              category="done"
              tasks={tasks}
              setTasks={setTasks}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Todos;
