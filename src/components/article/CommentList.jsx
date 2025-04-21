import { useState, useEffect } from "react";
import { getComments } from "../../api";
import { CommentCard } from "./CommentCard";

export const CommentList = ({
  article_id,
  comment_count,
  comments,
  setComments,
}) => {
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
    if (page !== null) {
      getComments(article_id, page, commemtsPerPage)
        .then(({ data: { comments } }) => {
          setComments((prevComments) => [...prevComments, ...comments]);
          setPage(page + 1);
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
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
            <button onClick={loadMore}>Load More</button>
          </div>
        )}
      </section>
    </>
  );
};
