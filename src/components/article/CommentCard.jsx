import { Vote } from "../reusable/Vote";
import { useContext } from "react";
import { UserContext } from "../../contexts/Users";
import { Delete } from "../reusable/Delete";
import { deleteComment, postVote } from "../../api";
import { useState, useEffect } from "react";
import { timeFormatted } from "../../utils/utils";
import "./Comment.css";

export const CommentCard = ({ comment, setComments }) => {
  const { user } = useContext(UserContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    if (isDeleted) {
      setComments((prevComments) =>
        prevComments.filter(
          (prevComment) => prevComment.comment_id !== comment.comment_id
        )
      );
    }
  }, [isDeleted]);

  return (
    <li>
      <div className="comment-vote">
        <Vote
          voteFor={"comments"}
          apiFunction={postVote}
          id={comment.comment_id}
          votes={comment.votes}
        />
      </div>
      <p>{comment.body}</p>
      <p>{comment.author}</p>
      <time>{timeFormatted(comment.created_at)}</time>
      {deleteMessage ? (
        <p>{deleteMessage}</p>
      ) : (
        user === comment.author && (
          <Delete
            id={comment.comment_id}
            apiFunction={deleteComment}
            setIsDeleted={setIsDeleted}
            setDeleteMessage={setDeleteMessage}
          />
        )
      )}
    </li>
  );
};
