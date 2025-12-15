import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { counterObjProivder } from "../../context/CounterContext";

function Login() {
  const { x, y } = useContext(counterObjProivder);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data1) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        data1
      );
      console.log("success", data);

      setSuccess(true);
      setMessage("Login successful! Redirecting...");

      localStorage.setItem("token", data.token);
      console.log(data.token);
      y(data.token);

      setTimeout(() => {
        navigate("/home");
      }, 1500); 
    } catch (err) {
      setSuccess(false);
      setMessage("Incorrect email or password");
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>


      {message && (
        <p
          className={`text-3xl text-center mt-4 px-4 py-2 rounded ${
            success ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
          }`}
        >
          {message}
        </p>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}

            <p className="mt-6 text-center text-sm text-gray-500">
              Forgot your password?{" "}
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Reset here
              </Link>
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^[A-Za-z0-9@#]{6,}$/,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
