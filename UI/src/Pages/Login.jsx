import { useState } from "react";
import ButtonField from "../Components/Button";
import InputField from "../Components/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-green-50 to-green-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-green-700 font-semibold text-2xl text-center mb-6">
          Access Account
        </h2>

        <div className="flex flex-col gap-4">
          <InputField type="text" placeholder="Email or Phone" />

          <div className="relative">
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pr-14"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-green-600"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <ButtonField>Sign In</ButtonField>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
