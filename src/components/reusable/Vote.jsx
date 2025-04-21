import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { useState } from "react";
import "./Vote.css";

export const Vote = ({ voteFor, apiFunction, id, votes }) => {
  const [likesCount, setLikesCount] = useState(votes);
  const [optimisticLike, setOptimisticLike] = useState("");
  const interactionVotes = { like: 1, dislike: -1 };

  const handleVote = (interactionType) => {
    setLikesCount(
      (currentLikesCount) =>
        currentLikesCount + interactionVotes[interactionType]
    );
    apiFunction(voteFor, id, interactionVotes[interactionType]).catch(() => {
      setLikesCount(
        (currentLikesCount) =>
          currentLikesCount - interactionVotes[interactionType]
      );
      setOptimisticLike("Your vote was not successful. Please try again!");
      setTimeout(() => setOptimisticLike(""), 2500);
    });
  };

  return (
    <div className="vote-section">
      <button
        className="vote-section__up-btn"
        onClick={() => handleVote("like")}
      >
        <BiSolidUpvote />
      </button>
      <button
        className="vote-section__down-btn"
        onClick={() => handleVote("dislike")}
      >
        <BiSolidDownvote />
      </button>
      <span className="vote-section__count">
        {likesCount} {likesCount === 1 ? "vote" : "votes"}
      </span>
      {optimisticLike && <p>{optimisticLike}</p>}
    </div>
  );
};
