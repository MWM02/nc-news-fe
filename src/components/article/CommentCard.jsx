import { Vote } from "../reusable/Vote";
import { useContext } from "react";
import { UserContext } from "../../contexts/Users";
import { Delete } from "../reusable/Delete";
import { deleteComment, postVote } from "../../api";
import { useState, useEffect } from "react";
import { timeFormatted } from "../../utils/utils";

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
    <div className="comment-card">
      <p className="comment-card__author">{comment.author}</p>
      <div className="comment-card__vote">
        <Vote
          voteFor={"comments"}
          apiFunction={postVote}
          id={comment.comment_id}
          votes={comment.votes}
        />
      </div>
      <time className="comment-card__time">
        {timeFormatted(comment.created_at)}
      </time>
      <p className="comment-card__body">{comment.body}</p>
      <div className="comment-card__delete">
        {deleteMessage ? (
          <p className="error-message">{deleteMessage}</p>
        ) : (
          user === comment.author && (
            <Delete
              commentId={comment.comment_id}
              apiFunction={deleteComment}
              setIsDeleted={setIsDeleted}
              setDeleteMessage={setDeleteMessage}
            />
          )
        )}
      </div>
    </div>
  );
};
