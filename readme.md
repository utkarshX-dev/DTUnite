export default function RedditStylePostCard({
  postAuthor,
  postDate,
  postImage,
  postDescription,
  postLikes,
  postDislikes,
  postComments,
  postLikedUsers,
  postDislikedUsers,
}) {
  return (
    <div>
      <p>Post kisne kri : {postAuthor}</p>
      <p>Post kab kri : {new Date(postDate).toLocaleDateString()}</p>
      <p>Post ka description : {postDescription}</p>
      <p>Post ke likes : {postLikes}</p>
      <p>Post ke dislikes : {postDislikes}</p>
      <h4>Post ke comments</h4>
      {postComments.map((comment, index) => (
        <div key={index}>
          comment {index + 1}:
          <p>Comment kisne kiya: {comment.author.username}</p>
          <p>Comment Date : {new Date(comment.createdAt).toLocaleDateString()}</p>
          <p>Comment kya hai : {comment.text}</p>
        </div>
      ))}
      <h5>Post ko kis kisne like kra:</h5>
      {postLikedUsers.map((user, index) => (
        <p key={index}>{user.username}</p>
      ))}
      <h5>Post ko kis kisne dislike kra:</h5>
      {postDislikedUsers.map((user, index) => (
        <p key={index}>{user.username}</p>
      ))}
      <br></br>
      <br></br>
    </div>
  );
}
