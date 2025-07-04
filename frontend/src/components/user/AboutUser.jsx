import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import UserPosts from "../PostCard";
import { Skeleton } from "@mui/material";
import axios from "axios";

export default function AboutUser({ loading }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  const refreshPosts = async () => {
    const res = await axios.get("http://localhost:8080/api/posts", {
      headers: { Authorization: localStorage.getItem("token") }
    });
    setPosts(res.data.posts);
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  if (loading || !user) {
    return (
      <div className="row">
        {[1, 2].map((i) => (
          <div className="col-12 mb-3" key={i}>
            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} />
          </div>
        ))}
      </div>
    );
  }

  
  const userPosts = posts.filter(
    (post) => post.author && post.author._id === user._id
  );

  if (userPosts.length === 0) {
    return (
      <div className="row">
        <div className="col-12">
          <p className="text-muted text-center">No posts available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12">
        <h1 className="fw-bold text-center text-primary mt-3">
          Your Posts : {userPosts.length}
        </h1>
      </div>
      {userPosts.map((post) => (
        <div className="col-12" key={post._id}>
          <UserPosts
            postId={post._id}
            postAuthor={user.username}
            postDate={post.createdAt}
            postImage={post.image}
            postDescription={post.description}
            postComments={post.comments}
            postLikedUsers={post.likedBy || []}
            postDislikedUsers={post.dislikedBy || []}
            currentUser={user}
            refreshPosts={refreshPosts}
            userAvatar={user.avatar}
          />
        </div>
      ))}
    </div>
  );
}