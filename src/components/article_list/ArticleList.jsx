import { Link } from "react-router-dom";
import { useState } from "react";
import { getArticles } from "../../api";
import { ArticleCard } from "./ArticleCard";
import useApiRequest from "../../custom_hooks/useApiRequest";

export const ArticleList = () => {
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const { data, isLoading, error } = useApiRequest(
    getArticles,
    page,
    resultsPerPage
  );
  const lastPage = data ? Math.ceil(data.total_count / resultsPerPage) : null;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <section>
        <ol className="article-list">
          {data.articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </ol>
      </section>
      <div className="page-buttons">
        <Link to={`/articles?p=${page - 1}&limit=${resultsPerPage}`}>
          <button
            className="previous-page-button"
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1}
          >
            {"<"}
          </button>
        </Link>
        <Link to={`/articles?p=${page + 1}&limit=${resultsPerPage}`}>
          <button
            className="next-page-button"
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={page === lastPage}
          >
            {">"}
          </button>
        </Link>
      </div>
    </>
  );
};
