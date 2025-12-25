import { Link, useNavigate } from "react-router-dom";
import  { useContext, useState } from "react";
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
      // Normalize email: trim whitespace and convert to lowercase
      const normalizedData = {
        ...data1,
        email: data1.email?.trim().toLowerCase()
      };
      
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        normalizedData
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
      const errorMessage = err.response?.data?.message || "Incorrect email or password";
      setMessage(errorMessage);
      console.error("Login error:", err.response?.data || err.message);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-indigo-50">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-500 mt-2">Sign in to continue your shopping</p>
        </div>

        {message && (
          <div
            className={`mb-4 rounded-lg px-4 py-3 text-sm ${
              success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  (value && value.includes("@") && value.includes(".")) ||
                  "Enter a valid email",
              })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use at least 6 characters.
            </p>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Forgot password?
            </Link>
            <Link to="/register" className="text-gray-600 hover:text-gray-800">
              Create account
            </Link>
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
