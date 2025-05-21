import { ArticleCard } from "./ArticleCard";
import { LoadingSpinner } from "../reusable/LoadingSpinner";

export const ArticleList = ({
  setSearchParams,
  data,
  page,
  lastPage,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    const errorMessage = error.response?.data?.error?.message;
    const errorCode = error.status;
    return (
      <div className="error-page">
        <p>{errorCode + ": " + errorMessage}</p>
      </div>
    );
  }

  return (
    <>
      <ol className="article-list">
        {data.articles.map((article) => (
          <li key={article.article_id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ol>
      <nav className="page-buttons">
        <button
          className="previous-page-button"
          onClick={() => {
            setSearchParams((prevSearchParams) => {
              prevSearchParams.set("p", page - 1);
              return prevSearchParams;
            });
          }}
          disabled={page === 1}
        >
          {"<"}
        </button>

        <button
          className="next-page-button"
          onClick={() =>
            setSearchParams((prevSearchParams) => {
              prevSearchParams.set("p", page + 1);
              return prevSearchParams;
            })
          }
          disabled={page === lastPage}
        >
          {">"}
        </button>
      </nav>
    </>
  );
};
