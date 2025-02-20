import React from "react";

const Login = () => {
  return (
    <div className="max-w-sm mx-auto mt-16 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form className="space-y-4">
        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Login Button */}
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
        <button className="w-full bg-red-500 text-white py-2 rounded-md">
          <div className="flex justify-center items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
            Log in with Google
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
