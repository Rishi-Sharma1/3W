import {
  registerUser,
  loginUser,
} from "./auth.service.js";

export const register = async (
  req,
  res
) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    if(!username || !email || !password) {
      throw new Error(
        "All fields are required"
      );
    }

    const result =
      await registerUser(
        username,
        email,
        password
      );

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (
  req,
  res
) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(
      email,
      password
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};