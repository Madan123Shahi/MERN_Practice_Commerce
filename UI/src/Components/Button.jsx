const ButtonField = ({ children, className = "" }) => {
  const baseClass =
    "bg-green-500 text-white p-3 rounded font-semibold hover:bg-green-600 transition-colors mt-2";
  return <button className={`${baseClass}${className}`}>{children}</button>;
};

export default ButtonField;
