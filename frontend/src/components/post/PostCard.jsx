import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import CommentModal from "./CommentModal";

export default function PostCard({ post, onLike, onComment }) {
  const [open, setOpen] = useState(false);
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography fontWeight={600}>{post.username}</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {new Date(post.createdAt).toLocaleString()}
        </Typography>

        {post.text && <Typography sx={{ mb: 2 }}>{post.text}</Typography>}

        {post.image && (
          <CardMedia
            component="img"
            image={post.image}
            alt="post"
            sx={{
              borderRadius: 2,
              mb: 2,
            }}
          />
        )}

        <Stack direction="row" spacing={2}>
          <Button onClick={() => onLike(post._id)}>
            ❤️ {post.likes.length}
          </Button>

          <Button onClick={() => setOpen(true)}>
            💬 {post.comments.length}
          </Button>
          
        </Stack>
        <CommentModal
            open={open}
            onClose={() => setOpen(false)}
            comments={post.comments}
            onAddComment={(comment) => onComment(post._id, comment)}
          />
      </CardContent>
    </Card>
  );
}
