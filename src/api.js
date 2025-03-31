import axios from "axios";

const api = axios.create({
  baseURL: "https://news-site-mta3.onrender.com",
});

const getArticles = async () => {
  try {
    const {
      data: { articles },
    } = await api.get("/api/articles");
    return articles;
  } catch (error) {
    console.log(error);
  }
};

export { getArticles };
