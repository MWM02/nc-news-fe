import axios from "axios";

const api = axios.create({
  baseURL: "https://news-site-mta3.onrender.com/api/",
});

const getArticles = async (p, limit, topic, sort_by, order) => {
  const res = await api.get("articles", {
    params: {
      p,
      limit,
      topic,
      sort_by,
      order,
    },
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

const postVote = async (voteFor, id, inc_votes) => {
  const endpoints = {
    articles: `articles/${id}`,
    comments: `comments/${id}`,
  };
  const res = await api.patch(endpoints[voteFor], { inc_votes });

  return res;
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

const postArticle = async (articleData) => {
  const res = await api.post(`articles`, articleData);

  return res;
};

const postTopic = async (topicData) => {
  const res = await api.post(`topics`, topicData);

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
  postArticle,
  postTopic,
};
