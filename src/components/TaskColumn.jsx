import React from "react";
import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";

const TaskColumn = ({ title, category, tasks, moveTaskToCategory }) => {
  const columnStyles = {
    "to-do": {
      textColor: "text-blue-700",
    },
    "in-progress": {
      textColor: "text-yellow-700",
    },
    done: {
      textColor: "text-green-700",
    },
  };

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTaskToCategory(item._id, category),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`task-column p-6   hover:shadow-lg transition-all duration-300 ease-in-out transform ${
        columnStyles[category]?.bgColor || "bg-gray-200"
      }`}
    >
      <h3
        className={`text-xl font-semibold ${
          columnStyles[category]?.textColor || "text-blue-900"
        } mb-6`}
      >
        {title}
      </h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
