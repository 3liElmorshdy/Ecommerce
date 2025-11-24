import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
const navigate =  useNavigate()

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email: data.email } 
      );
      setMessage("If your email exists in our system, a reset link has been sent.");
      setValidate(true);
      setTimeout(() => {
        navigate("/resetPass")
      }, 3000);
    } catch (error) {
      setMessage("Your email is not found in database");
      setValidate(false);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold mb-6">Forgot Password</h2>
        
        <label htmlFor="email" className="block mb-2 font-medium">
          Enter your email address
        </label>
        
        <input
          type="email"
          id="email"
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email is not valid"
            }
          })}
        />

        {errors.email && (
          <p className="text-red-600 text-sm mb-4">{errors.email.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p className={`mt-4 text-center ${validate ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

      </form>
    </div>
  );
}

export default ForgotPassword;
