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

export { getArticles };
