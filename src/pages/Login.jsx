import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const {signInUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
      e.preventDefault()
      Swal.fire({
        title: "Use Google To Login",
        text: "Right Now This is in production",
        icon: "question"
      });
    }
  return ( 
    <div className="w-2/5 mx-auto mt-16 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold py-5">Login To Your Account To add Your Tasks</h2>
      
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

      
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Log in with Email & Password
          </button>
        </div>
      </form>

      {/* Google Login Button */}
      <div className="mt-4">
      
        <button onClick={() => signInUser(navigate)} className="w-full bg-red-500 text-white py-2 rounded-md">
          <div className="flex justify-center items-center gap-2">
            <FaGoogle />
            Log in with Google
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
