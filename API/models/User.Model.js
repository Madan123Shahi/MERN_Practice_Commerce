import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    phone: String,
    password: String,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (entertedPassword) {
  return await bcrypt.compare(entertedPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
