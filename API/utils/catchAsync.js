// This is required so we don't have to write try and catch again and again in each controller
export const catchAsync = (fn) => {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};
