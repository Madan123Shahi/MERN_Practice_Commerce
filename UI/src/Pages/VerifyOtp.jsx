import { useForm } from "react-hook-form";
import { FaLock, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import ButtonField from "../Components/Button";
import InputField from "../Components/Input";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const { verifyOTP } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await verifyOTP(data.otp);
      navigate("/dashboard"); // or next step
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-emerald-50 via-white to-emerald-100 p-4">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-800 tracking-tight">
            Verify OTP
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter the 6-digit code sent to your mobile
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* OTP Field */}
          <div className="group">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600">
                <FaLock size={14} />
              </span>

              <InputField
                type="tel"
                placeholder="Enter OTP"
                maxLength={6}
                className={`w-full pl-10 text-center tracking-[0.4em] font-bold text-lg transition-all duration-300 border-2 ${
                  errors.otp
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-emerald-100 focus:border-emerald-500"
                }`}
                {...register("otp", {
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "OTP must be 6 digits",
                  },
                  setValueAs: (value) => value.replace(/\D/g, "").slice(0, 6),
                })}
              />
            </div>

            {/* Error Message */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                errors.otp ? "max-h-10 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                <FaExclamationCircle /> {errors.otp?.message}
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-700">
            <FaCheckCircle />
            OTP is valid for 5 minutes
          </div>

          {/* Submit Button */}
          <ButtonField
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${
              isValid
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                : "bg-gray-300"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </ButtonField>

          {/* Resend OTP */}
          <p className="text-center text-xs text-gray-500">
            Didn’t receive the code?{" "}
            <span className="text-emerald-600 font-semibold cursor-pointer hover:underline">
              Resend OTP
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
