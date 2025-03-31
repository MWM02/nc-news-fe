import { useState, useEffect } from "react";
import { getArticles } from "../api";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  return (
    <section>
      <ol>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ol>
    </section>
  );
};
