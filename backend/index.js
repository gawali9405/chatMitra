import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import bcrypt from "bcrypt";
// import router from "./routes/post.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use("/api/posts", router);

// Register Route
// app.post("/api/register", async (req, res) => {
//   const { name, email, password, mobile } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await pool.query(
//       "INSERT INTO users (name, email, password, mobile) VALUES ($1, $2, $3, $4) RETURNING *",
//       [name, email, hashedPassword, mobile]
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       user: result.rows[0],
//     });
//   } catch (error) {
//     console.error("Error during registration:", error.message);
//     res.status(500).json({ error: "Registration failed" });
//   }
// });

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    // 2. Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Success
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error during login", user });
  }
});

// POST /api/posts/:postId/comments
// app.post("/api/posts/:postId/comments", async (req, res) => {
//   const { postId } = req.params;
//   const { content } = req.body;

//   try {
//     const result = await pool.query(
//       "INSERT INTO comments (post_id, content) VALUES ($1, $2) RETURNING *",
//       [postId, content]
//     );
//     res.status(201).json({ message: "Comment added", comment: result.rows[0] });
//   } catch (error) {
//     console.error("Comment insert error:", error);
//     res.status(500).json({ error: "Failed to add comment" });
//   }
// });

// app.get("/api/posts/:postId/comments", async (req, res) => {
//   const { postId } = req.params;

//   try {
//     const result = await pool.query(
//       "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
//       [postId]
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching comments:", error);
//     res.status(500).json({ error: "Failed to fetch comments" });
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
