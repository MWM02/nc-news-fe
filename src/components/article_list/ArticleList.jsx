import { getArticles } from "../../api";
import { ArticleCard } from "./ArticleCard";
import { TopicList } from "./TopicList";
import { SortFilter } from "../reusable/SortFilter";
import { OrderBy } from "../reusable/OrderBy";
import { LoadingSpinner } from "../reusable/LoadingSpinner";
import useApiRequest from "../../custom_hooks/useApiRequest";
import { useSearchParams } from "react-router-dom";
import "./ArticleList.css";

export const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ p: 1, limit: 10 });
  const page = Number(searchParams.get("p"))
    ? Number(searchParams.get("p"))
    : 1;
  const resultsPerPage = 10;
  const topic = searchParams.get("topic") || "";
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const { data, isLoading, error } = useApiRequest(
    getArticles,
    page,
    resultsPerPage,
    topic,
    sort_by,
    order
  );
  const lastPage = data ? Math.ceil(data.total_count / resultsPerPage) : null;

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
      <div className="article-filters">
        <TopicList setSearchParams={setSearchParams} topic={topic} />
        <SortFilter setSearchParams={setSearchParams} sort_by={sort_by} />
        <OrderBy setSearchParams={setSearchParams} order={order} />
      </div>
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
