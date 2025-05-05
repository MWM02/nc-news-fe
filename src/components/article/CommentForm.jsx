import { useState, useContext } from "react";
import { UserContext } from "../../contexts/Users";
import { postComment } from "../../api";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../reusable/LoadingSpinner";
import "./Comment.css";

export const CommentForm = ({ setComments }) => {
  const { user } = useContext(UserContext);
  const { articleId } = useParams();
  const [commentToPost, setCommentToPost] = useState("");
  const [error, setError] = useState({});
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = (e) => {
    e.preventDefault();

    if (commentToPost.length === 0) {
      setError({ message: "Need a comment to post!" });
      setTimeout(() => setError(""), 2500);
    } else {
      setIsPosting(true);
      postComment(articleId, commentToPost, user)
        .then(({ data: { comment } }) => {
          setComments((prevComments) => [comment, ...prevComments]);
          setCommentToPost("");
        })
        .catch(() => {
          setError({
            message: "Unable to post your comment. Please try again!",
          });
          setTimeout(() => setError(""), 2500);
        })
        .finally(() => {
          setIsPosting(false);
        });
    }
  };

  return (
    <form className="comment-form" onSubmit={handlePost}>
      <textarea
        className={`comment-form__textarea ${
          isPosting ? "comment-form__textarea--disabled" : ""
        }`}
        placeholder="Join the conversation"
        value={commentToPost}
        onChange={(e) => setCommentToPost(e.target.value)}
        disabled={isPosting}
      />
      {isPosting ? (
        <LoadingSpinner />
      ) : (
        <button className="comment-form__btn">Post</button>
      )}
      <div className="error">
        {error && <p className="error-message">{error.message}</p>}
      </div>
    </form>
  );
};
