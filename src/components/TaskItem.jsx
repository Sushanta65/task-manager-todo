import React from "react";
import { useDrag } from "react-dnd";

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
      className="p-2 mt-2 border rounded-md shadow-md bg-white"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-sm">{task.description}</p>
    </div>
  );
};

export default TaskItem;
