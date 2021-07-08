export const validateNumbers = string => {
  const charReg = /^\d+$/;
  if (string === '' || !charReg.test(String(string).toLowerCase())) {
    return false;
  }
  return true;
};
