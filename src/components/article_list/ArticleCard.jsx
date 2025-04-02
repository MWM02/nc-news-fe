import { Link } from "react-router-dom";

export const ArticleCard = ({ article }) => {
  return (
    <Link to={`/articles/${article.article_id}`}>
      <li>
        <h2>{article.title}</h2>
        <img src={article.article_img_url}></img>
        <p>by {article.author}</p>
        <p>
          {article.votes} {article.votes === 1 ? "vote" : "votes"}
        </p>
        <p>{article.comment_count} comments</p>
      </li>
    </Link>
  );
};
