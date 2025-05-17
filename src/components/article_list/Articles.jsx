import { FilterMenu } from "./FilterMenu";
import { ArticleList } from "./ArticleList";
import { TopicSelector } from "./TopicSelector";
import { getArticles } from "../../api";
import { useSearchParams } from "react-router-dom";
import useApiRequest from "../../custom_hooks/useApiRequest";
import "./ArticleList.css";

export const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams({ p: 1, limit: 10 });
  const page = Number(searchParams.get("p")) || 1;
  const resultsPerPage = 10;
  const topic = searchParams.get("topic") || "";
  const orderBy = searchParams.get("order_by") || "desc";
  const sortBy = searchParams.get("sort_by") || "created_at";
  const { data, isLoading, error } = useApiRequest(
    getArticles,
    page,
    resultsPerPage,
    topic,
    sortBy,
    orderBy
  );
  const lastPage = data ? Math.ceil(data.total_count / resultsPerPage) : null;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ fontSize: "2rem" }}>
          {topic ? topic.toUpperCase() : "ALL TOPICS"}
        </h2>
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        <TopicSelector setSearchParams={setSearchParams} topic={topic} />
        <FilterMenu
          setSearchParams={setSearchParams}
          sortBy={sortBy}
          orderBy={orderBy}
          topic={topic}
        />
      </div>

      <ArticleList
        setSearchParams={setSearchParams}
        data={data}
        isLoading={isLoading}
        error={error}
        page={page}
        lastPage={lastPage}
      />
    </>
  );
};
