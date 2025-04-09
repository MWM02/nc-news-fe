import { useState, useContext } from "react";
import { validateImgUrl } from "../../utils/utils";
import { postArticle, getTopics } from "../../api";
import { UserContext } from "../../contexts/Users";
import "./ArticleForm.css";

export const ArticleForm = () => {
  const { user } = useContext(UserContext);
  const [articleData, setArticleData] = useState({
    title: "",
    topic: "",
    body: "",
    article_img_url: "",
    author: user,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // replace button with loading spinner
  const [postSuccess, setPostSuccess] = useState(false);
  const [topicExist, setTopicExist] = useState(true);

  const validateForm = () => {
    const newErrors = {};

    if (!articleData.title) {
      newErrors.title = "Article title is required";
    }
    if (!articleData.body) {
      newErrors.body = "Article content is required";
    }
    if (!articleData.topic) {
      newErrors.topic = "Article topic is required";
    }
    if (articleData.article_img_url) {
      if (!validateImgUrl(articleData.article_img_url)) {
        newErrors.article_img_url = "Invalid image URL";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
    if (value && errors[name]) {
      setErrors((prevErrors) => {
        delete prevErrors[name];
        return { ...prevErrors };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validateForm()) {
      getTopics()
        .then(({ data: { topics } }) => {
          let isValid = false;
          topics.forEach((topic) => {
            if (topic.slug === articleData.topic) {
              isValid = true;
            }
          });
          if (!isValid) {
            setTopicExist(false);
            return Promise.reject({
              error: {
                message:
                  "Topic does not exist. Please add new topic before continuing!",
              },
            });
          }
        })
        .then(() => {
          postArticle(articleData);
          setPostSuccess(true);
          setTimeout(() => setPostSuccess(false), 3000);
        })
        .catch(({ error }) => {
          setErrors(error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      <form id="post-comment-area" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={articleData.title}
            placeholder="Please enter article title"
            onChange={handleChange}
          ></input>
          {errors.title && <p>{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            name="topic"
            id="topic"
            value={articleData.topic}
            placeholder="Please enter article topic"
            onChange={handleChange}
          ></input>
          {errors.topic && <p>{errors.topic}</p>}
        </div>
        <div>
          <label htmlFor="body">Content:</label>
          <textarea
            type="text"
            name="body"
            id="body"
            value={articleData.body}
            placeholder="Please enter article content"
            onChange={handleChange}
          ></textarea>
          {errors.body && <p>{errors.body}</p>}
        </div>
        <div>
          <label htmlFor="image">Image URL {"(Optional)"}:</label>
          <input
            type="text"
            name="article_img_url"
            id="image"
            value={articleData.article_img_url}
            placeholder="Please enter article image URL"
            onChange={handleChange}
          ></input>
          {errors.article_img_url && <p>{errors.article_img_url}</p>}
        </div>
        <div>
          <button type="submit">Post Article</button>
          {postSuccess && <p>Your article has been posted!</p>}
          {errors.message && <p>{errors.message}</p>}
        </div>
      </form>
    </>
  );
};
