import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { useState } from "react";
import "./Vote.css";

export const Vote = ({ voteFor, apiFunction, id, votes }) => {
  const [likesCount, setLikesCount] = useState(votes);
  const [optimisticLike, setOptimisticLike] = useState("");

  const handleVote = (interactionType) => {
    const interactionVotes = { like: 1, dislike: -1 };
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
    <>
      <div className="vote-section">
        <div className="vote-section-buttons">
          <button onClick={() => handleVote("like")}>
            <BiSolidUpvote />
          </button>
          <span>
            {likesCount} {likesCount === 1 ? "vote" : "votes"}
          </span>
          <button onClick={() => handleVote("dislike")}>
            <BiSolidDownvote />
          </button>
        </div>
        {optimisticLike && <p className="error-message">{optimisticLike}</p>}
      </div>
    </>
  );
};
