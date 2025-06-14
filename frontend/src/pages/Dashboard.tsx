import { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaCommentAlt, FaRetweet, FaPaperPlane } from "react-icons/fa";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { formatDistanceToNow, parseISO } from "date-fns";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface DashboardProps {
  user: User | null;
}

interface Comment {
  id: number;
  post_id: number;
  content: string;
  created_at: string;
  username?: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  image?: string;
  liked?: boolean;
  comments?: Comment[];
  showCommentInput?: boolean;
}

const formatDateSafely = (dateString: string | undefined): string => {
  console.log("Input to formatter:", dateString);
  if (!dateString) return "Now";
  try {
    const parsedDate = parseISO(dateString);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch (error) {
    console.error("Invalid date:", dateString, error);
    return "Unknown time";
  }
};

const Dashboard = ({ user }: DashboardProps) => {
  const [createPost, setCreatePost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentTexts, setCommentTexts] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        const data = res.data.map((post: Post) => ({
          ...post,
          comments: [],
          showCommentInput: false,
        }));
        setPosts(data);
        setCommentTexts(data.map(() => ""));
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };
    fetchPosts();
  }, []);

  const toggleLike = (index: number) => {
    setPosts((prev) =>
      prev.map((post, i) =>
        i === index ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const toggleCommentInput = (index: number) => {
    setPosts((prev) =>
      prev.map((post, i) =>
        i === index
          ? { ...post, showCommentInput: !post.showCommentInput }
          : post
      )
    );
  };

  const addComment = async (index: number, comment: string) => {
    if (!comment.trim()) return;

    try {
      const postId = posts[index].id;
      const res = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        {
          content: comment,
        }
      );
      alert("Comment added successfully");

      const newComment: Comment = res.data.comment;

      setPosts((prev) =>
        prev.map((post, i) =>
          i === index
            ? {
                ...post,
                comments: [...(post.comments || []), newComment],
                showCommentInput: false,
              }
            : post
        )
      );
      setCommentTexts((prev) =>
        prev.map((text, i) => (i === index ? "" : text))
      );
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Could not save comment.");
    }
  };

  const fetchComments = async (postId: number, index: number) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/${postId}/comments`
      );
      const comments: Comment[] = res.data;

      setPosts((prev) =>
        prev.map((post, i) =>
          i === index
            ? {
                ...post,
                comments,
                showCommentInput: true,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/posts/create", {
        title,
        content,
        image,
      });
      const newPost: Post = {
        ...res.data.post,
        comments: [],
        showCommentInput: false,
      };
      setPosts((prev) => [newPost, ...prev]);
      setCommentTexts((prev) => ["", ...prev]);
      setTitle("");
      setContent("");
      setImage("");
      setCreatePost(false);
    } catch (err) {
      console.error("Post creation failed:", err);
      alert("Failed to create post. Try again.");
    }
  };

  console.log("post data", posts);

  return (
    <div className="home-container">
      <aside className="sidebar left-sidebar">
        <div>
          <h2>Dashboard</h2>
          {user ? (
            <>
              <p>Welcome, {user.name}!</p>
              <p>Your Email: {user.email}</p>
            </>
          ) : (
            <p>Please log in to see your dashboard.</p>
          )}
        </div>
      </aside>

      <main className="main-content">
        <h2>Posts</h2>
        <button onClick={() => setCreatePost(true)} className="create-post-btn">
          Create New Post
        </button>

        {createPost && (
          <form onSubmit={handlePostSubmit} className="post-form">
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Post Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <div>
              <button
                type="button"
                onClick={() => setCreatePost(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit">Post</button>
            </div>
          </form>
        )}

        <div className="posts">
          {posts.map((post, index) => (
            <article className="post" key={post.id}>
              <div className="post-header">
                <span className="username">@gawali150</span>
                <span className="post-date">
                  {formatDateSafely(post.createdAt)}
                </span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.image && (
                <img src={post.image} alt="Post" className="post-image" />
              )}

              <div className="post-actions">
                <button
                  className={`like-btn ${post.liked ? "liked" : ""}`}
                  onClick={() => toggleLike(index)}
                >
                  {post.liked ? (
                    <IoIosHeart color="red" />
                  ) : (
                    <IoIosHeartEmpty />
                  )}
                  Like
                </button>
                <button
                  onClick={() => {
                    toggleCommentInput(index);
                    fetchComments(post.id, index);
                  }}
                >
                  <FaCommentAlt /> Comment
                </button>
                <button onClick={() => alert("Repost feature coming soon!")}>
                  <FaRetweet /> Repost
                </button>
                <button
                  onClick={() => {
                    navigator.share
                      ? navigator.share({
                          title: post.title,
                          text: post.content,
                          url: window.location.href,
                        })
                      : alert("Sharing not supported");
                  }}
                >
                  <FaPaperPlane /> Share
                </button>
              </div>

              {post.showCommentInput && (
                <div className="comment-section">
                  <div className="comment-form">
                    <input
                      type="text"
                      className="comment-input"
                      value={commentTexts[index] || ""}
                      onChange={(e) => {
                        const newTexts = [...commentTexts];
                        newTexts[index] = e.target.value;
                        setCommentTexts(newTexts);
                      }}
                      placeholder="Write a comment..."
                    />
                    <button
                      className="send-btn"
                      onClick={() => addComment(index, commentTexts[index])}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

              {post.comments?.map((cmt) => (
                <div className="comment" key={cmt.id}>
                  <ul>
                    <li>
                      <strong className="comment-username">
                        @{cmt.username || "gawali150"}
                      </strong>
                      , {cmt.content}
                      <small style={{ color: "#777", fontSize: "12px" }}>
                        ({formatDateSafely(cmt.created_at)})
                      </small>
                    </li>
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </div>
      </main>

      <aside className="sidebar right-sidebar">
        <button onClick={() => navigate("/")} className="logout-btn">
          Logout
        </button>
      </aside>
    </div>
  );
};

export default Dashboard;
