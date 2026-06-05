import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import { generateToken } from "../../utils/jwt.js";

export const registerUser = async (
  username,
  email,
  password
) => {
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return {
    user,
    token: generateToken(user._id),
  };
};

export const loginUser = async (
  email,
  password
) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return {
    user,
    token: generateToken(user._id),
  };
};