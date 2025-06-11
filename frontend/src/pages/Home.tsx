import { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [createPost, setCreatePost] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [posts, setPosts] = useState<{ title: string; content: string }[]>([
    {
      title: "First Post",
      content:
        "This is the content of the first post. Welcome to the platform!",
    },
    {
      title: "React Tips",
      content:
        "Use useEffect wisely and break your components into smaller parts.",
    },
    {
      title: "Frontend vs Backend",
      content:
        "Frontend handles UI, backend deals with logic and data storage.",
    },
    {
      title: "JavaScript Tricks",
      content: "Use optional chaining and nullish coalescing for cleaner code.",
    },
    {
      title: "Learning CSS",
      content: "Flexbox and Grid are powerful tools for layout design.",
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
            <button type="submit">Submit Post</button>
          </form>
        )}

        <div className="posts">
          {[...posts].reverse().map((post, index) => (
            <article className="post" key={index}>
              <h1>gawali150</h1>
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

export default Home;
