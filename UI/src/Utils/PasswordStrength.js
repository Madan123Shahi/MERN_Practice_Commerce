/* ================= PASSWORD STRENGTH LOGIC ================= */
const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;
  return score; // 0–5
};

const strengthScore = getPasswordStrength(password);

const strengthLabel =
  strengthScore <= 2 ? "Weak" : strengthScore <= 4 ? "Medium" : "Strong";

const strengthPercent = (strengthScore / 5) * 100;
