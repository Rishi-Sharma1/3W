import Post from "./post.model.js";

export const createPostService = async (
  user,
  text,
  image
) => {
  if (!text && !image) {
    throw new Error(
      "Text or image is required"
    );
  }

  return await Post.create({
    userId: user._id,
    username: user.username,
    text,
    image,
  });
};

export const getAllPostsService =
  async () => {
    return await Post.find()
      .sort({
        createdAt: -1,
      });
  };

export const likePostService =
  async (postId, user) => {
    const post =
      await Post.findById(postId);

    if (!post) {
      throw new Error(
        "Post not found"
      );
    }

    const alreadyLiked =
      post.likes.find(
        (like) =>
          like.userId.toString() ===
          user._id.toString()
      );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (like) =>
          like.userId.toString() !==
          user._id.toString()
      );
    } else {
      post.likes.push({
        userId: user._id,
        username: user.username,
      });
    }

    await post.save();

    return post;
  };

export const addCommentService =
  async (
    postId,
    user,
    comment
  ) => {
    const post =
      await Post.findById(postId);

    if (!post) {
      throw new Error(
        "Post not found"
      );
    }

    post.comments.push({
      userId: user._id,
      username: user.username,
      comment,
    });

    await post.save();

    return post;
  };