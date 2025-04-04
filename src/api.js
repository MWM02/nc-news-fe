import axios from "axios";

const api = axios.create({
  baseURL: "https://news-site-mta3.onrender.com",
});

const getArticles = async (pageNum, resultsPerPage) => {
  const res = await api.get("/api/articles", {
    params: { p: pageNum, limit: resultsPerPage },
  });

  return res;
};

const getArticle = async (article_id) => {
  const res = await api.get(`/api/articles/${article_id}`);

  return res;
};

const getComments = async (article_id, pageNum, commentsPerPage) => {
  const res = await api.get(`/api/articles/${article_id}/comments`, {
    params: { p: pageNum, limit: commentsPerPage },
  });

  return res;
};

const postVote = async (article_id, inc_votes) => {
  await api.patch(`/api/articles/${article_id}`, {
    inc_votes,
  });
};

const postComment = async (article_id, body, username) => {
  const res = await api.post(`/api/articles/${article_id}/comments`, {
    username,
    body,
  });

  return res;
};

const deleteComment = async (comment_id) => {
  const res = await api.delete(`/api/comments/${comment_id}`);

  return res;
};

export {
  getArticles,
  getArticle,
  getComments,
  postVote,
  postComment,
  deleteComment,
};
