const InputField = ({ type, placeholder, className = "" }) => {
  const baseClass =
    "p-3 border-2 border-green-500 rounded outline-none placeholder:text-green-500 text-green-500 focus:border-green-700";
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${baseClass} ${className}`}
    />
  );
};

export default InputField;
