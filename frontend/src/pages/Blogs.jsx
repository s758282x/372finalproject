import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Container, Typography, Card, CardContent, CardActions } from "@mui/material";
import axios from "axios";

// ✅ Define API_URL locally at the top
const API_URL = process.env.NODE_ENV === "production"
  ? "https://finalback-ejdffjg2fjgedkde.centralus-01.azurewebsites.net/api"
  : "http://localhost:5001/api";

export default function Blogs() {
  const { user } = useUser();
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [blogData, setBlogData] = useState({ title: "", content: "", blog_id: null });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs`);
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleOpen = (blog = null) => {
    if (blog) {
      setEditMode(true);
      setBlogData({ title: blog.title, content: blog.content, blog_id: blog.blog_id });
    } else {
      setEditMode(false);
      setBlogData({ title: "", content: "", blog_id: null });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBlogData({ title: "", content: "", blog_id: null });
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.put(`${API_URL}/blogs/${blogData.blog_id}`, {
          title: blogData.title,
          content: blogData.content,
        });
      } else {
        await axios.post(`${API_URL}/blogs`, {
          title: blogData.title,
          content: blogData.content,
          user_id: user.user_id,
        });
      }
      fetchBlogs();
      handleClose();
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API_URL}/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Blog
        </Typography>

        {user && (
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
              Create New Blog
            </Button>
          </div>
        )}

        {/* List of Blogs */}
        {blogs.length === 0 ? (
          <Typography align="center">No blog posts yet.</Typography>
        ) : (
          blogs.map((blog) => (
            <Card key={blog.blog_id} sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body1">{blog.content}</Typography>
              </CardContent>
              {user && user.user_id === blog.user_id && (
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleOpen(blog)}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(blog.blog_id)}>
                    Delete
                  </Button>
                </CardActions>
              )}
            </Card>
          ))
        )}
      </Container>

      {/* Blog Create/Edit Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? "Edit Blog" : "Create Blog"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Title"
            fullWidth
            value={blogData.title}
            onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          />
          <TextField
            margin="normal"
            label="Content"
            fullWidth
            multiline
            minRows={4}
            value={blogData.content}
            onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {editMode ? "Save Changes" : "Create Blog"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
