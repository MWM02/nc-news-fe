import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { useContext } from "react";
import { UserContext } from "../../contexts/Users";
import { Delete } from "../reusable/Delete";
import { deleteComment } from "../../api";
import { useState, useEffect } from "react";

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
      <p>
        <button>
          <BiSolidUpvote />
        </button>
        <button>
          <BiSolidDownvote />
        </button>
        {comment.votes} {comment.votes === 1 ? "vote" : "votes"}
      </p>
      <p>{comment.body}</p>
      <p>{comment.author}</p>
      <p>{comment.created_at}</p>
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
