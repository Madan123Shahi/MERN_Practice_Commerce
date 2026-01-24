export const passwordRules = (password = "") => {
  return [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One Uppercase Letter", valid: /[A-Z]/.test(password) },
    { label: "One Lowercase Letter", valid: /[a-z]/.test(password) },
    { label: "One Number", valid: /\d/.test(password) },
    {
      label: "One Special Character",
      valid: /[~!@#$%^&*()_\-{}[\];:'",.<>?]/.test(password),
    },
  ];
};

export const allPasswordRules = (password = "") =>
  passwordRules(password).every((rule) => rule.valid);
