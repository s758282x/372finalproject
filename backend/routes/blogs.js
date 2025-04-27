const express = require("express");
const router = express.Router();
const  Blog  = require("../models/Blog"); // 

// Get all blogs
router.get("/", async (req, res) => {
  console.log("HIT GET /api/blogs");
  try {
    const blogs = await Blog.findAll({ order: [["blog_id", "DESC"]] });
    res.json({ blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Create a blog
router.post("/", async (req, res) => {
  const { title, content, user_id } = req.body;
  try {
    const newBlog = await Blog.create({ title, content, user_id });
    res.json({ blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// Update a blog
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.title = title;
    blog.content = content;
    await blog.save();

    res.json({ blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// Delete a blog
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    await blog.destroy();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;
