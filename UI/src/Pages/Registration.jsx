import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FaEye,
  FaEyeSlash,
  FaPhoneAlt,
  FaLock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { registerLoginSchema } from "../Validations/UserSchema";
import { allPasswordRules, passwordRules } from "../Utils/PasswordRuleHelper";
import ButtonField from "../Components/Button";
import InputField from "../Components/Input";

const RegistrationPage = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showPasswordFeedback, setShowPasswordFeedback] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerLoginSchema),
    mode: "onChange",
    defaultValues: {
      phone: "",
    },
  });

  const phone = watch("phone", "");
  // const password = watch("password", "");
  // const rules = passwordRules(password);
  // const isStrongPassword = allPasswordRules(password);

  // useEffect(() => {
  //   if (password) setShowPasswordFeedback(true);
  //   if (password && isStrongPassword && !errors.password) {
  //     const timer = setTimeout(() => setShowPasswordFeedback(false), 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [password, errors.password, isStrongPassword]);

  const onsubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Form Data", data);
    reset();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-emerald-50 via-white to-emerald-100 p-4">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-800 tracking-tight">
            Welcome
          </h2>
          <p className="text-gray-500 text-sm mt-2">Enter Mobile Number</p>
        </div>

        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-5">
          {/* Phone Number Field */}
          <div className="group">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600">
                <FaPhoneAlt size={14} />
              </span>
              <InputField
                type="tel"
                placeholder="Phone Number"
                maxLength={10}
                className={`w-full pl-10 transition-all duration-300 border-2 ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-emerald-100 focus:border-emerald-500"
                }`}
                {...register("phone", {
                  setValueAs: (value) => value.replace(/\D/g, "").slice(0, 10),
                })}
              />
              {/* <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="tel"
                    placeholder="Phone Number"
                    maxLength={10}
                    className={`w-full pl-10 transition-all duration-300 border-2 ${
                      errors.phone
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-emerald-100 focus:border-emerald-500"
                    }`}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      field.onChange(value);
                    }}
                  />
                )}
              /> */}
            </div>
            {/* Smooth Error Message */}
            <div
              className={`overflow-hidden transition-all duration-300 ${errors.phone ? "max-h-10 mt-2" : "max-h-0"}`}
            >
              <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                <FaExclamationCircle /> {errors.phone?.message}
              </p>
            </div>
          </div>

          {/* Password Field
          <div className="group">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600">
                <FaLock size={14} />
              </span>
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full pl-10 pr-12 transition-all duration-300 border-2 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-emerald-100 focus:border-emerald-500"
                }`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {/* Password Error Message */}
          {/* <div
              className={`overflow-hidden transition-all duration-300 ${errors.password ? "max-h-10 mt-2" : "max-h-0"}`}
            >
              <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                <FaExclamationCircle /> {errors.password?.message}
              </p>
            </div>
          </div> */}

          {/* Smart Password Feedback Card */}
          {/* {showPasswordFeedback && password && (
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                Security Checklist
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {rules.map((rule, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 text-[12px] font-semibold transition-colors duration-300 ${
                      rule.valid ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    <span
                      className={`p-0.5 rounded-full ${rule.valid ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-300"}`}
                    >
                      <FaCheckCircle />
                    </span>
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>
          // )} */}

          {/* Submit Button */}
          <div className="mt-2">
            <ButtonField
              disabled={!isValid || isSubmitting}
              className={`w-full py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                isValid
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                  : "bg-gray-300"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                "Continue"
              )}
            </ButtonField>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
