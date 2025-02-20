import React from "react";
import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";

const TaskColumn = ({ title, category, tasks, setTasks }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === item.id ? { ...task, category } : task
        )
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-full p-3 border rounded-md ${isOver ? "bg-blue-200" : "bg-gray-100"}`}
    >
      <h2 className="font-semibold">{title}</h2>
      {tasks
        .filter((task) => task.category === category)
        .map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskColumn;
