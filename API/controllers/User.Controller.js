import AppError from "./../utils/AppError";
import { catchAsync } from "./../utils/catchAsync";

export const register = catchAsync(async (req, res) => {
  const { userName, email, phone, password } = req.body;
});
