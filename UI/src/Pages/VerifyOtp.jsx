import { useForm } from "react-hook-form";
import { FaLock, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import ButtonField from "../Components/Button";
import InputField from "../Components/Input";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "../Utils/OTPTimerHook";
import { useEffect, useState } from "react";

const VerifyOtp = () => {
  const { verifyOTP, sendOTP, phone, otpExpiresAt } = useAuth();
  const navigate = useNavigate();
  const remaining = useCountdown(otpExpiresAt);
  const canResend = remaining === 0;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (otpExpiresAt) {
      setReady(true);
    }
  }, [otpExpiresAt]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const onSubmit = async (data) => {
    try {
      await verifyOTP(data.otp);
      navigate("/dashboard"); // verifyOTP already handles state updates
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || !phone) return;
    try {
      await sendOTP(phone);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-emerald-50 via-white to-emerald-100 p-4">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-800">Verify OTP</h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter the 6-digit code sent to your mobile
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* OTP Input */}
          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600">
                <FaLock size={14} />
              </span>

              <InputField
                type="tel"
                placeholder="Enter OTP"
                maxLength={6}
                className={`w-full pl-10 text-center tracking-[0.4em] font-bold text-lg border-2 ${
                  errors.otp
                    ? "border-red-300 bg-red-50"
                    : "border-emerald-100 focus:border-emerald-500"
                }`}
                {...register("otp", {
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "OTP must be 6 digits",
                  },
                  setValueAs: (v) => v.replace(/\D/g, "").slice(0, 6),
                })}
              />
            </div>

            {errors.otp && (
              <p className="text-xs text-red-500 mt-2 flex gap-1">
                <FaExclamationCircle /> {errors.otp.message}
              </p>
            )}
          </div>

          {/* Timer */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-700 flex items-center gap-2">
            <FaCheckCircle />
            {remaining > 0 ? (
              <>
                OTP expires in <b>{remaining}s</b>
              </>
            ) : (
              <span className="text-red-500 font-semibold">OTP expired</span>
            )}
          </div>

          {/* Submit */}
          <ButtonField
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-xl font-bold ${
              isValid ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-300"
            }`}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </ButtonField>

          {/* Resend */}
          <p className="text-center text-xs text-gray-500">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={!canResend}
              className={`font-semibold ${
                canResend
                  ? "text-emerald-600 hover:underline"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend OTP
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
