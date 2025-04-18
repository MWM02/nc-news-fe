import { getArticles } from "../../api";
import { ArticleCard } from "./ArticleCard";
import { TopicList } from "./TopicList";
import { SortFilter } from "../reusable/SortFilter";
import { OrderBy } from "../reusable/OrderBy";
import useApiRequest from "../../custom_hooks/useApiRequest";
import { useSearchParams } from "react-router-dom";
import "./ArticleList.css";

export const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ p: 1, limit: 10 });
  const page = Number(searchParams.get("p"))
    ? Number(searchParams.get("p"))
    : 1;
  const resultsPerPage = 10;
  const topic = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <main>
      <div className="article-filters">
        <TopicList setSearchParams={setSearchParams} topic={topic} />
        <SortFilter setSearchParams={setSearchParams} sort_by={sort_by} />
        <OrderBy setSearchParams={setSearchParams} order={order} />
      </div>

      <ol className="article-list">
        {data.articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
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
    </main>
  );
};
