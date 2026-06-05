import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export default function CreatePostCard({
  onCreatePost,
}) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!text.trim() && !image) {
      return;
    }

    const formData = new FormData();

    formData.append("text", text);

    if (image) {
      formData.append("image", image);
    }

    await onCreatePost(formData);

    setText("");
    setImage(null);
    setPreview("");
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Create Post
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="What's on your mind?"
        />

        <Stack
          direction="row"
          spacing={2}
          mt={2}
        >
          <Button
            component="label"
            variant="outlined"
          >
            Upload Image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Stack>

        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              marginTop: "16px",
              borderRadius: "8px",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}