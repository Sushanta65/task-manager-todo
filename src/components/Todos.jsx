import React, { useState, useContext, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn"; // Import TaskColumn component
import { AuthContext } from "../provider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Todos = () => {
  const [tasks, setTasks] = useState([]);
  const { user, signOutUser } = useContext(AuthContext);

  useEffect(() => {
    if (user?.uid) {
      axios
        .get(`http://localhost:5000/tasks?userId=${user.uid}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [user?.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.task.value.trim();
    const description = e.target.description.value.trim();

    if (!title) {
      Swal.fire({
        title: "Please Fil Up The Form",
        icon: "error",
        draggable: true
      });
      return;
    }

    const newTask = {
      userId: user?.uid,
      title,
      description,
      category: "to-do",
    };

    try {
      const res = await axios.post("http://localhost:5000/tasks", newTask);
      setTasks([...tasks, { ...newTask, _id: res.data.insertedId }]);
      e.target.reset();
      Swal.fire({
        title: "Task Added",
        icon: "success",
        draggable: true
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const moveTaskToCategory = async (taskId, newCategory) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId
        ? {
            ...task,
            category: newCategory,
            title: task.title,
            description: task.description,
          }
        : task
    );

    setTasks(updatedTasks);
    console.log("updated task", updatedTasks);
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, {
        category: newCategory,
        title: updatedTasks.map((taskTitle) =>
          taskTitle._id === taskId ? taskTitle.title : ""
        ),
        description: updatedTasks.map((taskDescription) =>
          taskDescription._id === taskId ? taskDescription.description : ""
        ),
      });
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  const handleEdit = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 pt-10 py-10">
        <div className="w-4/5 mx-auto rounded-lg mb-10 bg-blue-900 text-white flex justify-between items-center p-4 shadow-md">
          <div className="flex items-center gap-3">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border border-white"
              />
            )}
            <div>
              <h2 className="text-lg font-semibold hidden md:block">{user?.displayName}</h2>
              <p className="text-sm opacity-80 hidden md:block">{user?.email}</p>
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

        <div className="w-11/12 max-w-5xl mx-auto mt-6">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-4 py-5">
            Task Manager
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TaskColumn
              title="To-Do"
              category="to-do"
              tasks={tasks.filter((task) => task.category === "to-do")}
              moveTaskToCategory={moveTaskToCategory}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <TaskColumn
              title="In Progress"
              category="in-progress"
              tasks={tasks.filter((task) => task.category === "in-progress")}
              moveTaskToCategory={moveTaskToCategory}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <TaskColumn
              title="Completed"
              category="done"
              tasks={tasks.filter((task) => task.category === "done")}
              moveTaskToCategory={moveTaskToCategory}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Todos;
