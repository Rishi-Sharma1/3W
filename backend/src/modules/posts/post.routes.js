import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import upload from "../../middleware/uploadMiddleware.js";

import {
  createPost,
  getAllPosts,
  likePost,
  addComment,
} from "./post.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createPost
);

router.get("/", getAllPosts);

router.put(
  "/:id/like",
  authMiddleware,
  likePost
);

router.post(
  "/:id/comment",
  authMiddleware,
  addComment
);

export default router;