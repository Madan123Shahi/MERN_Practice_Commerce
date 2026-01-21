import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) next();
});

export const User = mongoose.model("User", userSchema);
