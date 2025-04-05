import { getArticles } from "../../api";
import { ArticleCard } from "./ArticleCard";
import { TopicList } from "./TopicList";
import useApiRequest from "../../custom_hooks/useApiRequest";
import { useSearchParams } from "react-router-dom";

export const ArticleList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ p: 1, limit: 10 });
  const page = Number(searchParams.get("p"))
    ? Number(searchParams.get("p"))
    : 1;
  const resultsPerPage = 10;
  const topic = searchParams.get("topic") || "";
  const { data, isLoading, error } = useApiRequest(
    getArticles,
    page,
    resultsPerPage,
    topic
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
        <TopicList setSearchParams={setSearchParams} topic={topic} />
        <ol className="article-list">
          {data.articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </ol>
      </section>
      <div className="page-buttons">
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
      </div>
    </>
  );
};
