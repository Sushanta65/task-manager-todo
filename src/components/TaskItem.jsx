import React from "react";
import { useDrag } from "react-dnd";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons

const TaskItem = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="p-4 mt-2 border rounded-md shadow-md bg-white flex justify-between items-start hover:bg-gray-100 transition duration-200 ease-in-out"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>

      <div className="flex gap-2 items-center">
        <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md">
          <FaEdit className="text-lg" />
        </button>
        <button className="btn btn-sm bg-red-500 text-white hover:bg-red-600 rounded-md">
          <FaTrashAlt className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
