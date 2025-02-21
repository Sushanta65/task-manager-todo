import axios from "axios";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { _id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = (taskId) => {
    axios
      .put(`https://task-manager-todo-server.vercel.app/tasks/${taskId}`, {
        ...task,
        title: editedTitle,
        description: editedDescription,
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Update Successfull.",
          icon: "success",
          draggable: true,
        });
        onEdit({ ...task, title: editedTitle, description: editedDescription });
        setIsModalOpen(false);
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleDelete = (taskId) => {
    axios
      .delete(`https://task-manager-todo-server.vercel.app/tasks/${taskId}`)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Deleted Successfully",
          icon: "error",
          draggable: true,
        });
        onDelete(taskId);
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div
      ref={drag}
      className={`task-item p-4 mb-4 bg-white shadow-md rounded-md cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h4 className="text-lg font-semibold">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex justify-between mt-3">
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={handleEditClick}
        >
          <FiEdit />
        </button>
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => handleDelete(task._id)}
        >
          <FiTrash2 />
        </button>
      </div>

      {isModalOpen && (
        <>
          <input
            type="checkbox"
            id="edit-task-modal"
            className="modal-toggle"
            checked={isModalOpen}
            readOnly
          />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Edit Task</h3>
              <div className="space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="text"
                  placeholder="Task Description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="modal-action">
                <button
                  className="btn bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => handleSave(task._id)}
                >
                  Save
                </button>
                <button
                  className="btn bg-gray-500 text-white hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
