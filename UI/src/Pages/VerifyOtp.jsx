// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FaShieldAlt, FaExclamationCircle, FaArrowRight } from "react-icons/fa";
// import ButtonField from "../Components/Button";
// import InputField from "../Components/Input";
// import { verifyOtpSchema } from "../Validations/OtpSchema.js";
// import { useAuth } from "../Context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const VerifyOtp = () => {
//   const { verifyOTP, resendOTP, phone, expiresAt } = useAuth();
//   const navigate = useNavigate();

//   const [timeLeft, setTimeLeft] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(verifyOtpSchema),
//     mode: "onChange",
//     defaultValues: { otp: "" },
//   });

//   // // Redirect if no phone number (user didn't come from login)
//   // useEffect(() => {
//   //   if (!phone && !expiresAt) {
//   //     navigate("/", { replace: true });
//   //   }
//   // }, [phone, expiresAt, navigate]);

//   // useEffect(() => {
//   //   console.log("user is: ", user);
//   //   if (user) {
//   //     navigate("/home", { replace: true });
//   //   }
//   // }, [user, navigate]);

//   // -----------------------------------
//   // Countdown (UI only)
//   // -----------------------------------
//   useEffect(() => {
//     if (!expiresAt) return;

//     const interval = setInterval(() => {
//       const remaining = Math.max(
//         0,
//         Math.floor((new Date(expiresAt) - Date.now()) / 1000),
//       );
//       setTimeLeft(remaining);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [expiresAt]);

//   // -----------------------------------
//   // Submit OTP
//   // -----------------------------------
//   const onSubmit = async (data) => {
//     setErrorMsg("");

//     try {
//       const result = await verifyOTP(phone, data.otp);

//       if (!result.success) {
//         setErrorMsg(result.message);
//         return;
//       }

//       // ✅ Use the returned user instead of waiting for state
//       console.log("Verified user:", result.user);

//       if (result.user) {
//         navigate("/header", { replace: true }); // navigate safely
//       }
//     } catch (err) {
//       setErrorMsg("Something went wrong. Please try again.");
//       console.error(err);
//     }
//   };

//   // -----------------------------------
//   // Resend OTP
//   // -----------------------------------
//   const handleResend = async () => {
//     setErrorMsg("");
//     const result = await resendOTP(phone);
//     if (!result.success) setErrorMsg(result.message);
//   };

//   // IMPORTANT: Don't render anything if phone is missing
//   if (!phone) {
//     return null; // or return a loading spinner if you prefer
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-background font-sans relative overflow-hidden">
//       {/* Background blobs */}
//       <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-200/50 rounded-full blur-[120px] animate-pulse" />
//       <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-green-200/40 rounded-full blur-[120px] animate-pulse delay-1000" />

//       <div className="relative z-10 w-full max-w-md p-6">
//         <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(5,150,105,0.15)] border border-white">
//           {/* Header */}
//           <div className="text-center mb-10">
//             <div className="relative inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-emerald-500 to-green-700 rounded-3xl shadow-2xl shadow-emerald-200 mb-6 animate-bounce-slow">
//               <FaShieldAlt className="text-white text-3xl" />
//               <div className="absolute inset-0 rounded-3xl border-2 border-white/20 scale-110" />
//             </div>

//             <p className="text-emerald-700 font-bold text-base mt-3">
//               Enter Otp sent to{" "}
//               <span className="text-emerald-700">+91{phone}</span>
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             <div className="relative group">
//               <div className="relative">
//                 <span
//                   className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 ${
//                     errors.otp ? "text-red-500" : "text-emerald-500"
//                   }`}
//                 >
//                   <FaShieldAlt size={16} />
//                 </span>

//                 <InputField
//                   type="text"
//                   placeholder="Enter OTP"
//                   maxLength={6}
//                   className={`w-full pl-14 pr-6 py-5 rounded-2xl border-2 bg-white/50 outline-none font-bold text-emerald-950
//                     ${
//                       errors.otp
//                         ? "border-red-100 focus:border-red-400 focus:ring-8 focus:ring-red-50"
//                         : "border-emerald-50 focus:border-emerald-500 focus:bg-white focus:ring-8 focus:ring-emerald-500/10"
//                     }`}
//                   {...register("otp", { setValueAs: (v) => v.trim() })}
//                 />
//               </div>

//               {(errors.otp || errorMsg) && (
//                 <div className="mt-3 flex items-center gap-2 px-2">
//                   <FaExclamationCircle className="text-red-500" size={14} />
//                   <span className="text-xs font-bold text-red-600">
//                     {errors.otp?.message || errorMsg}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Submit button (NOT blocked by timer) */}
//             <ButtonField
//               disabled={isSubmitting}
//               className="group relative w-full py-5 rounded-2xl font-black text-white tracking-widest transition-all duration-500 uppercase overflow-hidden bg-linear-to-r from-emerald-600 to-green-600 shadow-xl shadow-emerald-200 hover:shadow-emerald-300 active:scale-95"
//             >
//               <div className="relative z-10 flex items-center justify-center gap-3">
//                 {isSubmitting ? (
//                   <>
//                     <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
//                     <span>Verifying</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Verify OTP</span>
//                     <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-2" />
//                   </>
//                 )}
//               </div>
//             </ButtonField>
//           </form>

//           {/* Resend OTP */}
//           <div className="mt-6 text-center">
//             <button
//               type="button"
//               onClick={handleResend}
//               disabled={timeLeft > 0 || isSubmitting}
//               className={`
//       text-base font-bold text-emerald-600 transition-all duration-300
//       ${timeLeft > 0 || isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:underline"}
//     `}
//             >
//               Resend OTP
//               {/* Show countdown only if timeLeft > 0 */}
//               {timeLeft > 0 && (
//                 <span className="text-emerald-600 text-sm ml-2">
//                   in {Math.floor(timeLeft / 60)}:
//                   {(timeLeft % 60).toString().padStart(2, "0")}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes shimmer {
//           100% { transform: translateX(100%); }
//         }
//         .animate-bounce-slow {
//           animation: bounce 3s infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VerifyOtp;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { verifyOtpSchema } from "../Validations/OtpSchema";
import { useAuth } from "../Context/AuthContext";

const VerifyOtp = () => {
  const { verifyOTP, resendOTP, phone, expiresAt } = useAuth();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

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

  const onSubmit = async ({ otp }) => {
    setErrorMsg("");
    try {
      const result = await verifyOTP(phone, otp);
      if (!result.success) return setErrorMsg(result.message);
      navigate("/", { replace: true });
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleResend = async () => {
    setErrorMsg("");
    const result = await resendOTP(phone);
    if (!result.success) setErrorMsg(result.message);
  };

  if (!phone) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute -top-1/3 -left-1/4 h-[60%] w-[60%] rounded-full bg-emerald-200/50 blur-[120px] animate-pulse" />
      <div className="absolute -bottom-1/3 -right-1/4 h-[50%] w-[50%] rounded-full bg-green-200/40 blur-[120px] animate-pulse delay-1000" />

      <div className="relative z-10 w-full max-w-md p-4 sm:p-6">
        <div className="rounded-[2.5rem] border border-white bg-white/80 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(5,150,105,0.15)]">
          {/* Header */}
          <div className="mb-8 sm:mb-10 text-center">
            <div className="relative mx-auto mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-linear-to-br from-emerald-500 to-green-700 shadow-2xl shadow-emerald-200 animate-bounce-slow">
              <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              <div className="absolute inset-0 scale-110 rounded-3xl border-2 border-white/20" />
            </div>

            <p className="text-sm sm:text-base font-bold text-emerald-700">
              Enter OTP sent to{" "}
              <span className="font-extrabold">+91{phone}</span>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            {/* OTP Input */}
            <div>
              <div className="relative">
                <ShieldCheck
                  className={`absolute left-4 sm:left-5 top-1/2 h-4 w-4 -translate-y-1/2 ${
                    errors.otp ? "text-red-500" : "text-emerald-500"
                  }`}
                />

                <Input
                  type="text"
                  maxLength={6}
                  placeholder="Enter OTP"
                  className={`h-12 sm:h-14 rounded-2xl pl-12 sm:pl-14 pr-4 sm:pr-6 text-center font-bold tracking-widest
                    ${
                      errors.otp
                        ? "border-red-200 focus-visible:ring-red-200"
                        : "border-emerald-200 focus-visible:ring-emerald-300"
                    }`}
                  {...register("otp", { setValueAs: (v) => v.trim() })}
                />
              </div>

              {(errors.otp || errorMsg) && (
                <div className="mt-3 flex items-center gap-2 px-2 text-xs sm:text-sm font-bold text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {errors.otp?.message || errorMsg}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              disabled={isSubmitting}
              className="group relative h-12 sm:h-14 w-full rounded-2xl bg-linear-to-r from-emerald-600 to-green-600 text-sm sm:text-base font-black tracking-widest text-white shadow-xl shadow-emerald-200 transition-all hover:shadow-emerald-300 active:scale-95"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Verifying
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  Verify OTP
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </Button>
          </form>

          {/* Resend */}
          <div className="mt-6 text-center text-sm sm:text-base">
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0 || isSubmitting}
              className={`font-bold text-emerald-600 transition ${
                timeLeft > 0 || isSubmitting
                  ? "cursor-not-allowed opacity-50"
                  : "hover:underline"
              }`}
            >
              Resend OTP
              {timeLeft > 0 && (
                <span className="ml-2 text-sm">
                  in {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default VerifyOtp;
