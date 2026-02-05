import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Phone, AlertCircle, ArrowRight, Leaf } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { registerLoginSchema } from "../Validations/UserSchema";
import { useAuth } from "../Context/AuthContext";

const RegistrationPage = () => {
  const { sendOTP } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerLoginSchema),
    mode: "onChange",
    defaultValues: { phone: "" },
  });

  const onSubmit = async ({ phone }) => {
    try {
      await sendOTP(phone);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative flex items-start justify-center overflow-hidden bg-background pt-1 sm:pt-12 pb-16 h-[calc(100vh-140px)]">
      {/* Background blobs */}
      <div className="absolute -top-1/3 -left-1/4 h-[60%] w-[60%] rounded-full bg-emerald-200/50 blur-[120px] animate-pulse" />
      <div className="absolute -bottom-1/3 -right-1/4 h-[50%] w-[50%] rounded-full bg-green-200/40 blur-[120px] animate-pulse [animation-delay:1000ms]" />

      <div className="relative z-10 w-full max-w-md p-4 sm:p-6">
        {/* Glass Card */}
        <div className="rounded-[2.5rem] border border-white bg-white/80 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(5,150,105,0.15)]">
          {/* Header */}
          <div className="mb-8 sm:mb-10 text-center">
            <div className="relative mx-auto mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-linear-to-br from-emerald-500 to-green-700 shadow-2xl shadow-emerald-200 animate-bounce-slow">
              <Leaf className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              <div className="absolute inset-0 scale-110 rounded-3xl border-2 border-white/20" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-emerald-950">
              Login or sign up
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            {/* Phone Input */}
            <div>
              <div className="relative">
                <Phone
                  className={`absolute left-4 sm:left-5 top-1/2 h-4 w-4 -translate-y-1/2 ${
                    errors.phone ? "text-red-500" : "text-emerald-500"
                  }`}
                />

                <Input
                  type="tel"
                  placeholder="Enter 10 digit number"
                  maxLength={10}
                  className={`h-12 sm:h-14 rounded-2xl pl-12 sm:pl-14 pr-4 sm:pr-6 font-bold tracking-wide
                    ${
                      errors.phone
                        ? "border-red-200 focus-visible:ring-red-200"
                        : "border-emerald-200 focus-visible:ring-emerald-300"
                    }`}
                  {...register("phone", {
                    setValueAs: (v) => v.replace(/\D/g, "").slice(0, 10),
                  })}
                />
              </div>

              {errors.phone && (
                <div className="mt-3 flex items-center gap-2 px-2 text-xs sm:text-sm font-bold text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {errors.phone.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`group relative h-12 sm:h-14 w-full rounded-2xl text-sm sm:text-base font-black uppercase tracking-widest transition-all
                ${
                  isValid && !isSubmitting
                    ? "bg-linear-to-r from-emerald-600 to-green-600 text-white shadow-xl shadow-emerald-200 hover:shadow-emerald-300 active:scale-95"
                    : "cursor-not-allowed bg-emerald-100 text-emerald-300"
                }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  Get Secure OTP
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              )}

              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            </Button>
          </form>
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

export default RegistrationPage;

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   FaEye,
//   FaEyeSlash,
//   FaPhoneAlt,
//   FaLock,
//   FaCheckCircle,
//   FaExclamationCircle,
// } from "react-icons/fa";
// import { registerLoginSchema } from "../Validations/UserSchema";
// import { allPasswordRules, passwordRules } from "../Utils/PasswordRuleHelper";
// import ButtonField from "../Components/Button";
// import InputField from "../Components/Input";
// import { useAuth } from "../Context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const RegistrationPage = () => {
//   // const [showPassword, setShowPassword] = useState(false);
//   // const [showPasswordFeedback, setShowPasswordFeedback] = useState(false);
//   const { sendOTP } = useAuth();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(registerLoginSchema),
//     mode: "onChange",
//     defaultValues: {
//       phone: "",
//     },
//   });

//   const phone = watch("phone", "");
//   // const password = watch("password", "");
//   // const rules = passwordRules(password);
//   // const isStrongPassword = allPasswordRules(password);

//   // useEffect(() => {
//   //   if (password) setShowPasswordFeedback(true);
//   //   if (password && isStrongPassword && !errors.password) {
//   //     const timer = setTimeout(() => setShowPasswordFeedback(false), 2000);
//   //     return () => clearTimeout(timer);
//   //   }
//   // }, [password, errors.password, isStrongPassword]);

//   const onsubmit = async (data) => {
//     try {
//       await sendOTP(data.phone);
//       navigate("/VerifyOtp");
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-emerald-50 via-white to-emerald-100 p-4">
//       <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-emerald-800 tracking-tight">
//             Welcome
//           </h2>
//           <p className="text-gray-500 text-sm mt-2">Enter Mobile Number</p>
//         </div>

//         <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-5">
//           {/* Phone Number Field */}
//           <div className="group">
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600">
//                 <FaPhoneAlt size={14} />
//               </span>
//               <InputField
//                 type="tel"
//                 placeholder="Phone Number"
//                 maxLength={10}
//                 className={`w-full pl-10 transition-all duration-300 border-2 ${
//                   errors.phone
//                     ? "border-red-300 focus:border-red-500 bg-red-50"
//                     : "border-emerald-100 focus:border-emerald-500"
//                 }`}
//                 {...register("phone", {
//                   setValueAs: (value) => value.replace(/\D/g, "").slice(0, 10),
//                 })}
//               />
//               {/* <Controller
//                 name="phone"
//                 control={control}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     type="tel"
//                     placeholder="Phone Number"
//                     maxLength={10}
//                     className={`w-full pl-10 transition-all duration-300 border-2 ${
//                       errors.phone
//                         ? "border-red-300 focus:border-red-500 bg-red-50"
//                         : "border-emerald-100 focus:border-emerald-500"
//                     }`}
//                     onChange={(e) => {
//                       const value = e.target.value
//                         .replace(/\D/g, "")
//                         .slice(0, 10);
//                       field.onChange(value);
//                     }}
//                   />
//                 )}
//               /> */}
//             </div>
//             {/* Smooth Error Message */}
//             <div
//               className={`overflow-hidden transition-all duration-300 ${errors.phone ? "max-h-10 mt-2" : "max-h-0"}`}
//             >
//               <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
//                 <FaExclamationCircle /> {errors.phone?.message}
//               </p>
//             </div>
//           </div>

//           {/* Password Field
//           <div className="group">
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600">
//                 <FaLock size={14} />
//               </span>
//               <InputField
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className={`w-full pl-10 pr-12 transition-all duration-300 border-2 ${
//                   errors.password
//                     ? "border-red-300 focus:border-red-500 bg-red-50"
//                     : "border-emerald-100 focus:border-emerald-500"
//                 }`}
//                 {...register("password")}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800 transition-colors"
//               >
//                 {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//               </button>
//             </div>
//             {/* Password Error Message */}
//           {/* <div
//               className={`overflow-hidden transition-all duration-300 ${errors.password ? "max-h-10 mt-2" : "max-h-0"}`}
//             >
//               <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
//                 <FaExclamationCircle /> {errors.password?.message}
//               </p>
//             </div>
//           </div> */}

//           {/* Smart Password Feedback Card */}
//           {/* {showPasswordFeedback && password && (
//             <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
//               <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
//                 Security Checklist
//               </p>
//               <ul className="grid grid-cols-2 gap-2">
//                 {rules.map((rule, index) => (
//                   <li
//                     key={index}
//                     className={`flex items-center gap-2 text-[12px] font-semibold transition-colors duration-300 ${
//                       rule.valid ? "text-emerald-600" : "text-gray-400"
//                     }`}
//                   >
//                     <span
//                       className={`p-0.5 rounded-full ${rule.valid ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-300"}`}
//                     >
//                       <FaCheckCircle />
//                     </span>
//                     {rule.label}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           // )} */}

//           {/* Submit Button */}
//           <div className="mt-2">
//             <ButtonField
//               disabled={!isValid || isSubmitting}
//               className={`w-full py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 cursor-pointer ${
//                 isValid
//                   ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
//                   : "bg-gray-300"
//               }`}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center gap-3">
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   Processing...
//                 </span>
//               ) : (
//                 "Continue"
//               )}
//             </ButtonField>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   FaPhoneAlt,
//   FaExclamationCircle,
//   FaChevronRight,
//   FaFingerprint,
// } from "react-icons/fa";
// import { registerLoginSchema } from "../Validations/UserSchema";
// import ButtonField from "../Components/Button";
// import InputField from "../Components/Input";
// import { useAuth } from "../Context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const RegistrationPage = () => {
//   const { sendOTP } = useAuth();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(registerLoginSchema),
//     mode: "onChange",
//     defaultValues: { phone: "" },
//   });

//   const onsubmit = async (data) => {
//     try {
//       await sendOTP(data.phone);
//       navigate("/VerifyOtp");
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex justify-center items-center bg-[#0f172a] overflow-hidden font-sans">
//       {/* Mesh Gradient Background - Pure Color, Zero Gray */}
//       <div className="absolute top-0 left-0 w-full h-full opacity-30">
//         <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600 rounded-full blur-[120px] animate-pulse" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-600 rounded-full blur-[120px] animate-pulse delay-700" />
//       </div>

//       <div className="relative z-10 w-full max-w-md p-6">
//         <div className="bg-white shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md rounded-[2.5rem] border border-white/20 p-10">
//           {/* Brand Icon */}
//           <div className="flex justify-center mb-8">
//             <div className="relative">
//               <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 animate-ping" />
//               <div className="relative w-20 h-20 bg-linear-to-tr from-blue-600 to-violet-600 rounded-3xl flex items-center justify-center shadow-2xl">
//                 <FaFingerprint className="text-white text-4xl" />
//               </div>
//             </div>
//           </div>

//           {/* Typography with Blue-Toned Colors */}
//           <div className="text-center mb-10">
//             <h2 className="text-4xl font-black text-blue-950 tracking-tight leading-tight">
//               Verify Identity
//             </h2>
//             <p className="text-blue-600/70 font-bold text-sm mt-3 uppercase tracking-widest">
//               Secure Access Portal
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onsubmit)} className="space-y-8">
//             {/* Phone Input */}
//             <div className="relative group">
//               <label className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] ml-2 mb-2 block">
//                 Phone Number
//               </label>
//               <div className="relative group-focus-within:scale-[1.02] transition-transform duration-300">
//                 <span
//                   className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10
//                   ${errors.phone ? "text-red-500" : "text-blue-500 group-focus-within:text-blue-600"}`}
//                 >
//                   <FaPhoneAlt size={16} />
//                 </span>
//                 <InputField
//                   type="tel"
//                   placeholder="Enter 10 digits"
//                   maxLength={10}
//                   className={`w-full pl-14 pr-6 py-5 rounded-2xl border-2 transition-all duration-300 outline-none font-bold text-blue-950
//                     ${
//                       errors.phone
//                         ? "border-red-100 bg-red-50 focus:border-red-400"
//                         : "border-blue-50 bg-blue-50/30 focus:border-blue-500 focus:bg-white focus:ring-8 focus:ring-blue-500/5"
//                     }`}
//                   {...register("phone", {
//                     setValueAs: (value) =>
//                       value.replace(/\D/g, "").slice(0, 10),
//                   })}
//                 />
//               </div>

//               {/* Error UI */}
//               <div
//                 className={`mt-3 flex items-center gap-2 px-2 transition-all duration-500 ${errors.phone ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
//               >
//                 <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
//                 <span className="text-xs font-bold text-red-500 tracking-wide">
//                   {errors.phone?.message}
//                 </span>
//               </div>
//             </div>

//             {/* Action Button */}
//             <ButtonField
//               disabled={!isValid || isSubmitting}
//               className={`group relative w-full py-5 rounded-2xl font-black text-white tracking-widest transition-all duration-500 uppercase overflow-hidden
//                 ${
//                   isValid && !isSubmitting
//                     ? "bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.5)] active:scale-95"
//                     : "bg-blue-100 text-blue-300 cursor-not-allowed"
//                 }`}
//             >
//               <div className="relative z-10 flex items-center justify-center gap-3">
//                 {isSubmitting ? (
//                   <>
//                     <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
//                     <span>Processing</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Generate OTP</span>
//                     <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
//                   </>
//                 )}
//               </div>
//               {/* Button Shine Effect */}
//               <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
//             </ButtonField>
//           </form>

//           {/* Social Proof/Trust */}
//           <div className="mt-10 flex items-center justify-center gap-4 border-t border-blue-50 pt-6">
//             <div className="flex -space-x-2">
//               {[1, 2, 3].map((i) => (
//                 <div
//                   key={i}
//                   className={`w-8 h-8 rounded-full border-2 border-white bg-blue-${i + 1}00`}
//                 />
//               ))}
//             </div>
//             <p className="text-[10px] font-bold text-blue-950/40 uppercase tracking-widest leading-none">
//               Trusted by <br />
//               <span className="text-blue-600 text-[12px]">10k+ users</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   FaPhoneAlt,
//   FaShieldAlt,
//   FaArrowRight,
//   FaLeaf,
//   FaCheckCircle,
// } from "react-icons/fa";
// import { registerLoginSchema } from "../Validations/UserSchema";
// import ButtonField from "../Components/Button";
// import InputField from "../Components/Input";
// import { useAuth } from "../Context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const RegistrationPage = () => {
//   const { sendOTP } = useAuth();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(registerLoginSchema),
//     mode: "onChange",
//     defaultValues: { phone: "" },
//   });

//   const onsubmit = async (data) => {
//     try {
//       await sendOTP(data.phone);
//       navigate("/VerifyOtp");
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex bg-[#FAFEFC] font-sans selection:bg-emerald-100">
//       {/* LEFT PANEL: Branding (Visible on LG screens) */}
//       <div className="hidden lg:flex w-1/2 relative bg-emerald-950 items-center justify-center p-12 overflow-hidden">
//         {/* Decorative Background Blobs */}
//         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -mr-20 -mt-20" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/10 rounded-full blur-[80px] -ml-10 -mb-10" />

//         <div className="relative z-10 max-w-lg">
//           <div className="flex items-center gap-3 mb-8">
//             <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20 animate-bounce-slow">
//               <FaLeaf className="text-white text-2xl" />
//             </div>
//             <span className="text-white font-black text-2xl tracking-tighter">
//               ECOSYSTEM
//             </span>
//           </div>

//           <h1 className="text-5xl font-black text-white leading-[1.1] mb-6">
//             Secure access to your{" "}
//             <span className="text-emerald-400">digital garden.</span>
//           </h1>

//           <div className="space-y-5 mt-12">
//             {[
//               "Military-grade AES-256 encryption",
//               "Instant OTP verification",
//               "Zero-knowledge privacy policy",
//             ].map((text, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-4 text-emerald-100/70 font-medium text-lg"
//               >
//                 <FaCheckCircle className="text-emerald-400" />
//                 {text}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* RIGHT PANEL: The Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
//         <div className="w-full max-w-110 transition-all duration-700">
//           {/* Header Section */}
//           <div className="mb-10 text-left">
//             <h2 className="text-4xl font-black text-emerald-950 tracking-tight">
//               Get Started
//             </h2>
//             <p className="text-slate-500 mt-3 font-medium text-lg">
//               Enter your mobile number to receive a secure code.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit(onsubmit)} className="space-y-7">
//             {/* Phone Input Group */}
//             <div className="space-y-2">
//               <label className="text-[13px] font-bold text-emerald-900/50 uppercase tracking-[0.15em] ml-1">
//                 Mobile Identifier
//               </label>

//               <div className="relative group">
//                 <span
//                   className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10
//                   ${errors.phone ? "text-red-500" : "text-emerald-600/40 group-focus-within:text-emerald-600"}`}
//                 >
//                   <FaPhoneAlt size={18} />
//                 </span>

//                 <InputField
//                   type="tel"
//                   placeholder="000 000 0000"
//                   maxLength={10}
//                   className={`w-full pl-14 pr-6 py-5 rounded-2xl border-2 transition-all duration-300 outline-none font-bold text-lg
//                     ${
//                       errors.phone
//                         ? "border-red-100 bg-red-50/30 text-red-900 focus:border-red-400"
//                         : "border-slate-100 bg-white focus:border-emerald-500 shadow-sm focus:shadow-emerald-100"
//                     }`}
//                   {...register("phone", {
//                     setValueAs: (v) => v.replace(/\D/g, "").slice(0, 10),
//                   })}
//                 />
//               </div>

//               {/* Error Message */}
//               {errors.phone && (
//                 <div className="flex items-center gap-2 text-red-500 text-sm font-bold mt-2 ml-1 animate-in slide-in-from-top-1">
//                   <FaShieldAlt className="text-[10px]" />
//                   {errors.phone.message}
//                 </div>
//               )}
//             </div>

//             {/* Action Button */}
//             <ButtonField
//               disabled={!isValid || isSubmitting}
//               className={`group relative w-full py-5 rounded-2xl font-black text-white tracking-widest transition-all duration-500 uppercase overflow-hidden
//                 ${
//                   isValid && !isSubmitting
//                     ? "bg-emerald-600 hover:bg-emerald-700 shadow-2xl shadow-emerald-200 active:scale-[0.98]"
//                     : "bg-slate-200 text-slate-400 cursor-not-allowed"
//                 }`}
//             >
//               <div className="relative z-10 flex items-center justify-center gap-3">
//                 {isSubmitting ? (
//                   <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <>
//                     <span>Send Verification Code</span>
//                     <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-2" />
//                   </>
//                 )}
//               </div>
//               {/* Shine Effect */}
//               <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
//             </ButtonField>
//           </form>

//           {/* Footer Trust Note */}
//           <p className="mt-10 text-center text-slate-400 text-sm font-medium">
//             By continuing, you agree to our
//             <a href="#" className="text-emerald-600 hover:underline ml-1">
//               Terms of Service
//             </a>
//             .
//           </p>
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

// export default RegistrationPage;
