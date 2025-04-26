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
  const [isLoading, setIsLoading] = useState(false); // replace with loading spinner
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
        })
        .then(() => {
          setPostSuccess(true);
          setArticleData({
            title: "",
            topic: "",
            body: "",
            article_img_url: "",
            author: user,
          });
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
      <form className="article-form" onSubmit={handleSubmit}>
        <div className="article-form__field">
          <label htmlFor="title">Title:</label>
          <input
            className="article-form__input article-form__title-input"
            type="text"
            name="title"
            id="title"
            value={articleData.title}
            onChange={handleChange}
          ></input>
          <div className="error">
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>
        </div>
        <div className="article-form__field">
          <label htmlFor="topic">Topic:</label>
          <input
            className="article-form__input article-form__topic-input"
            type="text"
            name="topic"
            id="topic"
            value={articleData.topic}
            onChange={handleChange}
          ></input>
          <div className="error">
            {errors.topic && <p className="error-message">{errors.topic}</p>}
          </div>
        </div>
        <div className="article-form__field">
          <label htmlFor="body">Content:</label>
          <textarea
            className="article-form__input article-form__body-input"
            type="text"
            name="body"
            id="body"
            value={articleData.body}
            onChange={handleChange}
          ></textarea>
          <div className="error">
            {errors.body && <p className="error-message">{errors.body}</p>}
          </div>
        </div>
        <div className="article-form__field">
          <label htmlFor="image">Image URL {"(Optional)"}:</label>
          <input
            className="article-form__input article-form__img-url"
            type="text"
            name="article_img_url"
            id="image"
            value={articleData.article_img_url}
            onChange={handleChange}
          ></input>
          <div className="error">
            {errors.article_img_url && (
              <p className="error-message">{errors.article_img_url}</p>
            )}
          </div>
        </div>

        <div>
          <button className="article-form__btn" type="submit">
            Post Article
          </button>
          <div className="user-feedback error">
            {postSuccess && (
              <p className="success-message">Your article has been posted!</p>
            )}
            {errors.message && (
              <p className="error-message">{errors.message}</p>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
