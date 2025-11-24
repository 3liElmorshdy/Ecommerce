import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ResetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate  = useNavigate()
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);
    setSuccessMessage(null);
    try {
       await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: data.number,
      });
      setSuccessMessage("Reset code verified successfully.");
      setTimeout(() => {
        navigate("/ResetCorrect")
      }, 3000);
    } catch (error) {
      setServerError("Failed to verify reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center min-h-screen px-6">
      <label htmlFor="number">Enter the reset number</label>
      <input
      className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        type="text"
        id="number"
        {...register("number", {
          required: "This field is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Only numeric digits are allowed",
          },
        })}
      />
      {errors.number && <p className="text-red-600 ">{errors.number.message}</p>}

      <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 disabled:opacity-50">
        {loading ? "Verifying..." : "Submit"}
      </button>

      {serverError && <p className="text-red-600 ">{serverError}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
}

export default ResetPass;
