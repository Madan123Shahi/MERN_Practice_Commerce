import { useState, useEffect } from "react";
import ButtonField from "../Components/Button";
import InputField from "../Components/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../Validations/LoginSchema";
import { allPasswordRules, passwordRules } from "../Utils/PasswordRuleHelper";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordFeedback, setShowPasswordFeedback] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const identifier = watch("identifier");
  const password = watch("password", "");
  const rules = passwordRules(password);
  const isStrongPassword = allPasswordRules(password);

  /* ================= AUTO-HIDE LOGIC (REAL WORLD UX) ================= */
  useEffect(() => {
    if (password) {
      setShowPasswordFeedback(true);
    }

    // When password becomes valid & strong → hide after 2 seconds
    if (
      password &&
      isStrongPassword &&
      !errors.password
      // && strengthLabel === "Strong"
    ) {
      const timer = setTimeout(() => {
        setShowPasswordFeedback(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [password, errors.password, allPasswordRules]);

  const onsubmit = async (data) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form Data", data);
        resolve();
      }, 3000);
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-green-50 to-green-500">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-green-700 font-semibold text-xl sm:text-2xl text-center mb-6">
          Access Account
        </h2>

        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4">
          {/* Identifier */}
          <InputField
            type="text"
            placeholder="Email or Phone"
            {...register("identifier")}
          />
          {identifier && errors.identifier && (
            <span className="text-sm text-red-500">
              {errors.identifier?.message}
            </span>
          )}
          {/* Password */}
          <div className="relative">
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pr-14"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {/* ✅ ERROR OUTSIDE RELATIVE */}
          <div className="min-h-5">
            {password && errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          {/* 🔐 PASSWORD STRENGTH METER
          {showPasswordFeedback && password && (
            <div className="flex flex-col gap-1">
              <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    strengthLabel === "Weak"
                      ? "bg-red-500"
                      : strengthLabel === "Medium"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                  style={{ width: `${strengthPercent}%` }}
                />
              </div>

              <span
                className={`text-xs font-medium ${
                  strengthLabel === "Weak"
                    ? "text-red-500"
                    : strengthLabel === "Medium"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                Password strength: {strengthLabel}
              </span>
            </div>
          )} */}
          {showPasswordFeedback && password && (
            <div className="bg-gray-50 border-2 border-green-500 rounded-md p-3 space-y-2">
              <p className="text-base font-semibold text-green-600">
                Password must contain:
              </p>

              <ul className="space-y-1">
                {rules.map((rule, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 text-xs ${
                      rule.valid ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    <span className="text-sm">{rule.valid ? "✓" : "✗"}</span>
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Submit */}
          <ButtonField disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </ButtonField>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
