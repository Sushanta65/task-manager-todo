import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineLogin, AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillClipboardDataFill } from "react-icons/bs";

const Home = () => {
  const { user, signOutUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-5">
      <div className="max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Welcome to Task Manager!
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Organize your tasks efficiently with our{" "}
          <strong>drag-and-drop</strong> feature. Sign in to start managing your
          tasks today!
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            to="/todos"
            className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-900 transition"
          >
            <BsFillClipboardDataFill /> Create Your To-Do
          </Link>
          {user?.email ? (
            <button
              onClick={signOutUser}
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-700 transition"
            >
              <FiLogOut /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-gray-700 text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-900 transition"
            >
              <AiOutlineLogin /> Login
            </Link>
          )}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
          <AiOutlineCheckCircle className="text-blue-900 text-4xl mb-3" />
          <h3 className="font-bold text-lg text-gray-800">Task Management</h3>
          <p className="text-gray-600 text-sm text-center">
            Create, edit, and manage your tasks in an intuitive way.
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
          <BsFillClipboardDataFill className="text-blue-900 text-4xl mb-3" />
          <h3 className="font-bold text-lg text-gray-800">Drag & Drop</h3>
          <p className="text-gray-600 text-sm text-center">
            Easily move tasks between categories with a smooth drag-and-drop
            experience.
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
          <AiOutlineLogin className="text-blue-900 text-4xl mb-3" />
          <h3 className="font-bold text-lg text-gray-800">Secure & Fast</h3>
          <p className="text-gray-600 text-sm text-center">
            Secure login with Firebase and real-time updates using MongoDB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
