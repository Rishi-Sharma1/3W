import { useEffect, useState } from "react";

import { Container, Box, Typography } from "@mui/material";

import Navbar from "../components/common/Navbar";
import CreatePostCard from "../components/post/CreatePostCard";
import PostCard from "../components/post/PostCard";
import { getPosts, likePost, createPost, addComment } from "../services/postService";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (id) => {
    try {
      await likePost(id);

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePost = async (
  formData
) => {
  try {
    const newPost =
      await createPost(formData);

    setPosts((prev) => [
      newPost,
      ...prev,
    ]);
  } catch (error) {
    console.log(error);
  }
};

const handleComment =
  async (
    postId,
    comment
  ) => {
    try {
      await addComment(
        postId,
        comment
      );

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="md">
        <Box mt={4}>
          <CreatePostCard onCreatePost={handleCreatePost} />

          <Typography
            variant="h5"
            sx={{
              mt: 4,
              mb: 2,
            }}
          >
            Recent Posts
          </Typography>

          {posts.map((post) => (
            <PostCard key={post._id} post={post} onLike={handleLike} onComment={handleComment} />
          ))}
        </Box>
      </Container>
    </>
  );
}
