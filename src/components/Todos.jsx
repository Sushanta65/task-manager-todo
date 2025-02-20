import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";
import { Link } from "react-router-dom";

const Todos = () => {
  const [tasks, setTasks] = useState([]);

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
      <div className="w-3/5 mx-auto bg-gray-200 text-center p-5">
      <div>
        <Link to={'/login'}>Login</Link>
      </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Add Task</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <input type="text" name="task" placeholder="Task Title" className="border p-2 mb-2 w-full" />
            <br />
            <input type="text" name="description" placeholder="Task Description" className="border p-2 mb-2 w-full" />
            <br />
            <button type="submit" className="btn btn-sm bg-blue-500 text-white px-3 py-1">Add Task</button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Task Manager</h2>
        </div>

        <div className="flex justify-between gap-2">
          <TaskColumn title="To-Do" category="to-do" tasks={tasks} setTasks={setTasks} />
          <TaskColumn title="In Progress" category="in-progress" tasks={tasks} setTasks={setTasks} />
          <TaskColumn title="Completed" category="done" tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </DndProvider>
  );
};

export default Todos;
