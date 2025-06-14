// import express from "express";
// import pool from "../db.js"; 

// const router = express.Router();
 

// // Create Post
// router.post("/create", async (req, res) => {
//   const { title, content, image } = req.body;

//   try {
//     const result = await pool.query(
//       "INSERT INTO posts (title, content, image) VALUES ($1, $2, $3) RETURNING *",
//       [title, content, image]
//     );
//     res.status(201).json({ message: "Post created", post: result.rows[0] });
//   } catch (err) {
//     console.error("Create post error:", err.message);
//     res.status(500).json({ message: "Failed to create post" });
//   }
// });

// // Get All Posts
// router.get("/", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error("Fetch posts error:", err.message);
//     res.status(500).json({ message: "Failed to fetch posts" });
//   }
// });

// export default router;
