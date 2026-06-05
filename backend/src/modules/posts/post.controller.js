import {
  createPostService,
  getAllPostsService,
  likePostService,
  addCommentService,
} from "./post.service.js";
import cloudinary from "../../config/cloudinary.js";

export const createPost = async (
  req,
  res
) => {
  try {
    const { text } = req.body;

    let imageUrl = "";

    if (req.file) {
  const result =
    await new Promise(
      (resolve, reject) => {
        const stream =
          cloudinary.uploader.upload_stream(
            {
              folder: "posts",
            },
            (
              error,
              result
            ) => {
              if (error)
                return reject(
                  error
                );

              resolve(result);
            }
          );

        stream.end(
          req.file.buffer
        );
      }
    );

  imageUrl =
    result.secure_url;
}

    const post =
      await createPostService(
        req.user,
        text,
        imageUrl
      );

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllPosts =
  async (req, res) => {
    try {
      const posts =
        await getAllPostsService();

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const likePost =
  async (req, res) => {
    try {
      const post =
        await likePostService(
          req.params.id,
          req.user
        );

      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };

export const addComment =
  async (req, res) => {
    try {
      const { comment } =
        req.body;

      const post =
        await addCommentService(
          req.params.id,
          req.user,
          comment
        );

      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };