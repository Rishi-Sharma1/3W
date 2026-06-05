import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";

export default function CommentModal({
  open,
  onClose,
  comments,
  onAddComment,
}) {
  const [comment, setComment] =
    useState("");

  const handleSubmit =
    async () => {
      if (!comment.trim()) return;

      await onAddComment(
        comment
      );

      setComment("");
    };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Comments
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          {comments?.map(
            (item) => (
              <div
                key={
                  item._id
                }
              >
                <Typography
                  fontWeight={
                    600
                  }
                >
                  {
                    item.username
                  }
                </Typography>

                <Typography>
                  {
                    item.comment
                  }
                </Typography>
              </div>
            )
          )}
        </Stack>

        <TextField
          fullWidth
          multiline
          rows={2}
          sx={{ mt: 3 }}
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
        />

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={
            handleSubmit
          }
        >
          Comment
        </Button>
      </DialogContent>
    </Dialog>
  );
}