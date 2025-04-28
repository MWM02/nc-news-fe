import { useParams } from "react-router-dom";
import { useState } from "react";
import useApiRequest from "../../custom_hooks/useApiRequest";
import { getArticle, postVote } from "../../api";
import { CommentList } from "./CommentList";
import { Vote } from "../reusable/Vote";
import { CommentForm } from "./CommentForm";
import { ErrorPage } from "../ErrorPage";
import { timeFormatted } from "../../utils/utils";
import "./Article.css";
import "./Comment.css";

export const Article = () => {
  const { articleId } = useParams();
  const { data, isLoading, error } = useApiRequest(getArticle, articleId);
  const [comments, setComments] = useState([]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return error.includes("404") ? <ErrorPage /> : <p>{error.message}</p>;
  }

  return (
    <>
      <section className="article-section">
        <article className="article-section__article">
          <h2>{data.article.title}</h2>
          <p>By {data.article.author}</p>
          <time>Posted on {timeFormatted(data.article.created_at)}</time>
          <img src={data.article.article_img_url}></img>
          <p>{data.article.body}</p>
          <Vote
            voteFor={"articles"}
            apiFunction={postVote}
            id={articleId}
            votes={data.article.votes}
          />
        </article>
      </section>
      <section className="comments-section">
        <h3 className="comments-section__header">Comments</h3>
        <CommentForm setComments={setComments} />
        <CommentList
          article_id={data.article.article_id}
          comment_count={data.article.comment_count}
          comments={comments}
          setComments={setComments}
        />
      </section>
    </>
  );
};
