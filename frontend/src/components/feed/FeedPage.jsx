import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Mind from "./Mind.jsx";
import PostCard from "../PostCard.jsx";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchUser = useCallback(() => {
    setLoading(true);
    axios
      axios.get(`${process.env.REACT_APP_API_BASE}/api/user`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setCurrentUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, [token]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/posts`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }
    fetchUser();
    fetchPosts();
  }, [fetchUser, fetchPosts, navigate, token]);

  if (loading) {
    return (
      <div className="row">
        {[1, 2].map((i) => (
          <div className="col-12 mb-3" key={i}>
            <div className="skeleton" style={{ height: 120, borderRadius: 12, background: "#eee" }} />
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="container my-5">
      <div className="col-12">
        <Mind userAvatar={currentUser.avatar } />
      </div>
      {posts.length === 0 && (
        <div className="col-12">
          <p className="text-muted text-center">No posts available</p>
        </div>
      )}
      {posts.map((post) => (
        <div className="col-12" key={post._id}>
          <PostCard
            postId={post._id}
            postAuthor={post.author?.username || ""}
            postDate={post.createdAt}
            postImage={post.image}
            postDescription={post.description}
            postComments={post.comments}
            postLikedUsers={post.likedUsers || []}
            postDislikedUsers={post.dislikedUsers || []}
            onPostDelete={null}
            currentUser={currentUser}
            userAvatar={post.userAvatar}
          />
        </div>
      ))}
    </div>
  );
}

export default FeedPage;