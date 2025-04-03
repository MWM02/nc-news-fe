import { useState, useContext } from "react";
import { UserContext } from "../../contexts/Users";
import { postComment } from "../../api";
import { useParams } from "react-router-dom";

export const CommentForm = ({ setComments }) => {
  const { user } = useContext(UserContext);
  const { articleId } = useParams();
  const [commentToPost, setCommentToPost] = useState("");
  const [error, setError] = useState(null);
  const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(false);
  const isPostDisabled = commentToPost.length === 0;

  const handlePost = (e) => {
    e.preventDefault();
    setIsTextAreaDisabled(true);
    postComment(articleId, commentToPost, user)
      .then(({ data: { comment } }) =>
        setComments((prevComments) => [comment, ...prevComments])
      )
      .catch(() => {
        setError({ message: "Unable to post your comment. Please try again!" });
        setTimeout(() => setError(""), 2500);
      })
      .finally(() => {
        setIsTextAreaDisabled(false);
      });
    setCommentToPost("");
  };

  return (
    <form id="post-comment-area" onSubmit={handlePost}>
      <textarea
        id="post-text-area"
        placeholder="Join the conversation"
        type="text"
        value={commentToPost}
        onChange={(e) => setCommentToPost(e.target.value)}
        disabled={isTextAreaDisabled}
      />
      {error && <p>{error.message}</p>}
      <button disabled={isPostDisabled}>Post</button>
    </form>
  );
};
