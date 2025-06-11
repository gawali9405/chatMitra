import { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  FaThumbsUp,
  FaCommentAlt,
  FaRetweet,
  FaPaperPlane,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

interface Post {
  title: string;
  content: string;
  createdAt: Date;
}

const Dashboard = () => {
  const [createPost, setCreatePost] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [posts, setPosts] = useState<Post[]>([
    {
      title: "First Post",
      content:
        "This is the content of the first post. Welcome to the platform!",
      createdAt: new Date(), 
    },
  ]);

  const navigate = useNavigate();

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      const newPost: Post = {
        title,
        content,
        createdAt: new Date(), 
      };
      setPosts([...posts, newPost]);
      setTitle("");
      setContent("");
      setCreatePost(false);
    }
  };

  return (
    <div className="home-container">
      {/* Left Sidebar */}
      <aside className="sidebar left-sidebar">
        <h2>User Details</h2>
        <p>Name: Sandip Gawali</p>
        <p>Email: gawali150@example.com</p>
      </aside>

      {/* Main Content */}
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
          {[...posts].reverse().map((post, index) => (
            <article className="post" key={index}>
              <div className="post-header">
                <span className="username">@gawali150</span>
                <span className="post-date">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>

              <div className="post-actions">
                <button>
                  <FaThumbsUp /> Like
                </button>
                <button>
                  <FaCommentAlt /> Comment
                </button>
                <button>
                  <FaRetweet /> Repost
                </button>
                <button>
                  <FaPaperPlane /> Send
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="sidebar right-sidebar">
        <button onClick={() => navigate("/")} className="logout-btn">
          Logout
        </button>
      </aside>
    </div>
  );
};

export default Dashboard;
