import axios from "axios";

const api = axios.create({
  baseURL: "https://news-site-mta3.onrender.com/api/",
});

const getArticles = async (pageNum, resultsPerPage, selectedTopic) => {
  const res = await api.get("articles", {
    params: { p: pageNum, limit: resultsPerPage, topic: selectedTopic },
  });

  return res;
};

const getArticle = async (article_id) => {
  const res = await api.get(`articles/${article_id}`);

  return res;
};

const getComments = async (article_id, pageNum, commentsPerPage) => {
  const res = await api.get(`articles/${article_id}/comments`, {
    params: { p: pageNum, limit: commentsPerPage },
  });

  return res;
};

const postVote = async (article_id, inc_votes) => {
  await api.patch(`articles/${article_id}`, {
    inc_votes,
  });
};

const postComment = async (article_id, body, username) => {
  const res = await api.post(`articles/${article_id}/comments`, {
    username,
    body,
  });

  return res;
};

const deleteComment = async (comment_id) => {
  const res = await api.delete(`comments/${comment_id}`);

  return res;
};

const getTopics = async () => {
  const res = await api.get(`topics`);

  return res;
};

export {
  getArticles,
  getArticle,
  getComments,
  postVote,
  postComment,
  deleteComment,
  getTopics,
};
