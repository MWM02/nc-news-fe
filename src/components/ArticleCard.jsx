export const ArticleCard = ({ article }) => {
  return (
    <li>
      <h2>{article.title}</h2>
      <img src={article.article_img_url}></img>
      <p>{article.author}</p>
      <p>{article.votes}</p>
      <p>{article.comment_count}</p>
    </li>
  );
};
