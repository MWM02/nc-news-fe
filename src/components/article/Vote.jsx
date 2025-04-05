import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { getArticle, postVote } from "../../api";
import { useState, useEffect } from "react";

export const Vote = ({ articleId }) => {
  const [likesCount, setLikesCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [optimisticLike, setOptimisticLike] = useState("");

  useEffect(() => {
    getArticle(articleId)
      .then(
        ({
          data: {
            article: { votes },
          },
        }) => setLikesCount(votes)
      )
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleVote = (interactionType) => {
    const interactionVotes = { like: 1, dislike: -1 };
    setLikesCount(
      (currentLikesCount) =>
        currentLikesCount + interactionVotes[interactionType]
    );
    postVote(articleId, interactionVotes[interactionType]).catch(() => {
      setLikesCount(
        (currentLikesCount) =>
          currentLikesCount - interactionVotes[interactionType]
      );
      setOptimisticLike("Your vote was not successful. Please try again!");
      setTimeout(() => setOptimisticLike(""), 2500);
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <button onClick={() => handleVote("like")}>
        <BiSolidUpvote />
      </button>
      <button onClick={() => handleVote("dislike")}>
        <BiSolidDownvote />
      </button>
      {optimisticLike && <p>{optimisticLike}</p>}
      <span>
        {likesCount} {likesCount === 1 ? "vote" : "votes"}
      </span>
    </>
  );
};
