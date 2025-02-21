import React from "react";
import { useDrag } from "react-dnd"; // Import useDrag for handling drag events
import { FiEdit, FiTrash2 } from "react-icons/fi";

const TaskItem = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK", // Specify the type of draggable item
    item: { _id: task._id }, // Attach the task's id to the draggable item
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Track if the item is being dragged
    }),
  });

  return (
    <div
      ref={drag}
      className={`task-item p-4 mb-4 bg-white shadow-md rounded-md ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h4 className="text-lg font-semibold">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex justify-between mt-2">
        <button className="text-blue-500">
          <FiEdit />
        </button>
        <button className="text-red-500">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
