const ButtonField = ({ children, className = "" }) => {
  const baseClass = `
    bg-green-500 text-white p-3 rounded font-semibold
    transition-colors}
  `;
  return <button className={`${baseClass}${className}`}>{children}</button>;
};

export default ButtonField;
