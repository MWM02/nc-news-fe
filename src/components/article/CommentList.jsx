import { useState, useEffect } from "react";
import { getComments } from "../../api";
import { CommentCard } from "./CommentCard";
import { LoadingSpinner } from "../reusable/LoadingSpinner";

export const CommentList = ({
  article_id,
  comment_count,
  comments,
  setComments,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [commemtsPerPage, setCommemtsPerPage] = useState(3);
  const lastPage = Math.ceil(comment_count / commemtsPerPage);

  useEffect(() => {
    getComments(article_id, page, commemtsPerPage)
      .then(({ data: { comments } }) => {
        setComments(comments);
        setPage(page + 1);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const loadMore = () => {
    setIsLoadingMore(true);
    if (page !== null) {
      getComments(article_id, page, commemtsPerPage)
        .then(({ data: { comments } }) => {
          setComments((prevComments) => [...prevComments, ...comments]);
          setPage(page + 1);
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoadingMore(false));
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <section>
        <ol>
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              <CommentCard comment={comment} setComments={setComments} />
            </li>
          ))}
        </ol>
        {lastPage !== page - 1 && page !== null && (
          <div className="loadmore">
            {isLoadingMore ? (
              <LoadingSpinner />
            ) : (
              <button className="loadmore__btn btn" onClick={loadMore}>
                Load More
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
};
