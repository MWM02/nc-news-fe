import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";

export const CommentCard = ({ comment }) => {
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
    </li>
  );
};
