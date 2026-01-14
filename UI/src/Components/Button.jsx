const ButtonField = ({ children, className = "", disabled = false }) => {
  const baseClass = `
    bg-green-500 text-white p-3 rounded font-semibold
    transition-colors
    ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}
  `;
  return (
    <button disabled={disabled} className={`${baseClass}${className}`}>
      {children}
    </button>
  );
};

export default ButtonField;
