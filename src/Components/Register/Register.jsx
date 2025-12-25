import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const onsubmit = async (data) => {
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data);
      setSuccess(true);
      setMessage("Account created! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setSuccess(false);
      setMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-indigo-50">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
          <p className="text-gray-500 mt-2">
            Join us to shop and track your orders easily.
          </p>
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

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
                  message: "Use letters and spaces only",
                },
              })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email (e.g. name@example.com)",
                },
              })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-900"
            >
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(?:\+20|0)?1[0125][0-9]{8}$/,
                  message: "Enter a valid Egyptian number (e.g. 01012345678)",
                },
              })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="01012345678"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

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
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$!%*?&]{6,}$/,
                  message: "Min 6 chars, include letters and numbers",
                },
              })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use at least 6 characters with letters and numbers.
            </p>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="rePassword"
              className="block text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              id="rePassword"
              type="password"
              autoComplete="new-password"
              {...register("rePassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••"
            />
            {errors.rePassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-500 ps-1.5 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

