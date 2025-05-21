import { Link } from "react-router-dom";

export const ArticleCard = ({ article }) => {
  return (
    <Link to={`/articles/${article.article_id}`} className="article-card">
      <h3 className="article-card__title">{article.title}</h3>
      <h4 className="article-card__topic">{article.topic.toUpperCase()}</h4>
      <img
        className="article-card__image"
        src={article.article_img_url || null}
      ></img>
      <p className="article-card__author">by {article.author}</p>
      <p className="article-card__votes">
        {article.votes} {article.votes === 1 ? "vote" : "votes"}
      </p>
      <p className="article-card__comments">
        {article.comment_count}
        {article.comment_count === 1 ? " comment" : " comments"}
      </p>
    </Link>
  );
};
