import { forwardRef } from "react";

const InputField = forwardRef(
  ({ type, placeholder, className = "", ...rest }, ref) => {
    const baseClass = `
  p-3 border-2 border-green-500 rounded outline-none placeholder:text-green-500 text-green-500 focus:border-green-700
`;
    return (
      <div className="flex flex-col gap-1">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          {...rest}
          className={`${baseClass} ${className}`}
        />
      </div>
    );
  }
);

export default InputField;
