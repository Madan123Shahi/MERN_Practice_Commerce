import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaShieldAlt, FaExclamationCircle, FaArrowRight } from "react-icons/fa";
import ButtonField from "../Components/Button";
import InputField from "../Components/Input";
import { verifySchema } from "../Validations/OtpSchema.js";
import { useAuth } from "../Context/AuthContext";
import { replace, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const { verifyOTP, resendOTP, phone, expiresAt } = useAuth();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [validSession, setValidSession] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(verifySchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  // Redirect to login if page is refreshed or no OTP session exists
  useEffect(() => {
    if (!phone || !expiresAt) {
      navigate("/", { replace: true });
    } else {
      setValidSession(true);
    }
  }, [phone, expiresAt, navigate]);

  // -----------------------------------
  // Countdown (UI ONLY – backend is truth)
  // -----------------------------------
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((new Date(expiresAt) - Date.now()) / 1000),
      );
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  // -----------------------------------
  // Submit OTP (backend validates expiry)
  // -----------------------------------
  const onSubmit = async (data) => {
    setErrorMsg("");
    const result = await verifyOTP(phone, data.otp);

    if (result.success) {
      navigate("/home");
    } else {
      setErrorMsg(result.message);
    }
  };

  // -----------------------------------
  // Resend OTP
  // -----------------------------------
  const handleResend = async () => {
    setErrorMsg("");
    const result = await resendOTP(phone);
    if (!result.success) setErrorMsg(result.message);
  };

  if (!validSession) return null;

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f0f9f4] font-sans relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-200/50 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-green-200/40 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(5,150,105,0.15)] border border-white">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-emerald-500 to-green-700 rounded-3xl shadow-2xl shadow-emerald-200 mb-6 animate-bounce-slow">
              <FaShieldAlt className="text-white text-3xl" />
              <div className="absolute inset-0 rounded-3xl border-2 border-white/20 scale-110" />
            </div>

            <h2 className="text-4xl font-black text-emerald-950 tracking-tight leading-tight">
              Verify OTP
            </h2>

            <p className="text-emerald-700/60 font-bold text-sm mt-3 uppercase tracking-[0.2em]">
              Enter the OTP sent to your phone
            </p>

            {timeLeft !== null && (
              <p className="text-emerald-500 text-xs mt-1">
                Expires in {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative group">
              <label className="text-[11px] font-black text-emerald-800/40 uppercase tracking-widest ml-2 mb-2 block">
                OTP Code
              </label>

              <div className="relative">
                <span
                  className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 ${
                    errors.otp ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  <FaShieldAlt size={16} />
                </span>

                <InputField
                  type="text"
                  placeholder="Enter OTP"
                  maxLength={6}
                  className={`w-full pl-14 pr-6 py-5 rounded-2xl border-2 bg-white/50 outline-none font-bold text-emerald-950
                    ${
                      errors.otp
                        ? "border-red-100 focus:border-red-400 focus:ring-8 focus:ring-red-50"
                        : "border-emerald-50 focus:border-emerald-500 focus:bg-white focus:ring-8 focus:ring-emerald-500/10"
                    }`}
                  {...register("otp", { setValueAs: (v) => v.trim() })}
                />
              </div>

              {(errors.otp || errorMsg) && (
                <div className="mt-3 flex items-center gap-2 px-2">
                  <FaExclamationCircle className="text-red-500" size={14} />
                  <span className="text-xs font-bold text-red-600">
                    {errors.otp?.message || errorMsg}
                  </span>
                </div>
              )}
            </div>

            {/* Submit button (NOT blocked by timer) */}
            <ButtonField
              disabled={isSubmitting}
              className="group relative w-full py-5 rounded-2xl font-black text-white tracking-widest transition-all duration-500 uppercase overflow-hidden bg-linear-to-r from-emerald-600 to-green-600 shadow-xl shadow-emerald-200 hover:shadow-emerald-300 active:scale-95"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Verifying</span>
                  </>
                ) : (
                  <>
                    <span>Verify OTP</span>
                    <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-2" />
                  </>
                )}
              </div>
            </ButtonField>
          </form>

          {/* Resend */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleResend}
              className="text-xs font-bold text-emerald-600 underline"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default VerifyOtp;
