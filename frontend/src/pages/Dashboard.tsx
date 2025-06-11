import { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [createPost, setCreatePost] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [posts, setPosts] = useState<{ title: string; content: string }[]>([
    {
      title: "First Post",
      content:
        "This is the content of the first post. Welcome to the platform!",
    },
  ]);

  const navigate = useNavigate();

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      setPosts([...posts, { title, content }]);
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
              <h5>@gawali150</h5>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
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
