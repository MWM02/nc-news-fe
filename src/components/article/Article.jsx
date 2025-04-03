import { useParams } from "react-router-dom";
import useApiRequest from "../../custom_hooks/useApiRequest";
import { getArticle } from "../../api";
import { CommentList } from "./CommentList";
import { Vote } from "./Vote";

export const Article = () => {
  const { articleId } = useParams();
  const { data, isLoading, error } = useApiRequest(getArticle, articleId);
  const date = data && new Date(data.article.created_at);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <article className="article">
        <h2>{data.article.title}</h2>
        <h3>{data.article.author}</h3>
        <h4>{date.toString()}</h4>
        <img src={data.article.article_img_url}></img>
        <p>{data.article.body}</p>
        <div>
          <Vote articleId={articleId} votes={data.article.votes} />
        </div>
      </article>
      <CommentList
        article_id={data.article.article_id}
        comment_count={data.article.comment_count}
      />
    </>
  );
};
