import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Home = () => {
    const {user, signOutUser} = useContext(AuthContext)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-5">
      {/* Hero Section */}
      <div className="max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Task Manager!
        </h1>
        <p className="text-gray-600 mb-6">
          Organize your tasks efficiently with our **drag-and-drop** feature. Sign in to start managing your tasks today!
        </p>

        {/* Buttons */}
        <div className="space-x-4">
          <Link to="/todos" className="btn btn-primary">
            Create Your To-Do
          </Link>
         {user?.email? <button onClick={signOutUser} className="btn btn-alert">Logout</button> : <Link to="/login" className="btn btn-secondary">
            Login
          </Link>}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="font-bold text-lg text-gray-800">📋 Task Management</h3>
          <p className="text-gray-600 text-sm">
            Create, edit, and manage your tasks in an intuitive way.
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="font-bold text-lg text-gray-800">🔄 Drag & Drop</h3>
          <p className="text-gray-600 text-sm">
            Easily move tasks between categories with a smooth drag-and-drop experience.
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="font-bold text-lg text-gray-800">🔒 Secure & Fast</h3>
          <p className="text-gray-600 text-sm">
            Secure login with Firebase and real-time updates using MongoDB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
