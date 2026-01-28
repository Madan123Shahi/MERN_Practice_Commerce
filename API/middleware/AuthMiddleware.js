import { verifyAccessToken } from "../utils/Token";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new AppError("Unauthorized", 401));

  const decoded = verifyAccessToken(token);
  req.user = decoded.id;
  next();
};
