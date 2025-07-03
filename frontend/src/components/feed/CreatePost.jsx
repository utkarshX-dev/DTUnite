import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function CreatePost() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>Create a New Post</h1>
      {user && (
        <div style={{ marginBottom: 16 }}>
          <span>Posting as: </span>
          <strong>{user.username}</strong>
        </div>
      )}:{
        //move to auth path if user not exists
        !user && (
          <div style={{ marginBottom: 16 }}>
            <span>You must be logged in to create a post.</span>
          </div>
        )
      }
      {/* Add your post creation form here */}
    </>
  );
}

export default CreatePost;