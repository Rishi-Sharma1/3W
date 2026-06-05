import api from "../api/axios";

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const createPost = async (
  formData
) => {
  const response =
    await api.post(
      "/posts",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};

export const likePost = async (postId) => {
  const response = await api.put(
    `/posts/${postId}/like`
  );

  return response.data;
};

export const addComment =
  async (
    postId,
    comment
  ) => {
    const response =
      await api.post(
        `/posts/${postId}/comment`,
        { comment }
      );

    return response.data;
  };