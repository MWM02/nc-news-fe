import { useState, useContext, useEffect } from "react";
import { validateImgUrl } from "../../utils/utils";
import { postArticle, getTopics, postTopic } from "../../api";
import { UserContext } from "../../contexts/Users";
import { LoadingSpinner } from "../reusable/LoadingSpinner";
import "./ArticleForm.css";

export const ArticleForm = () => {
  const { user } = useContext(UserContext);
  const [articleData, setArticleData] = useState({
    title: "",
    topic: "",
    body: "",
    articleImgUrl: "",
    author: user,
    topicDescription: "",
    topicImgUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isPosting, setIsPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [topicExist, setTopicExist] = useState(true);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then(({ data: { topics } }) => {
      setTopics(topics.map((topics) => topics.slug));
    });
  }, []);

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
    if (articleData.articleImgUrl) {
      if (!validateImgUrl(articleData.articleImgUrl)) {
        newErrors.articleImgUrl = "Invalid image URL";
      }
    }
    if (!topicExist && !articleData.topicDescription) {
      newErrors.topicDescription =
        "Topic description is required for new topics";
    }
    if (articleData.topicImgUrl) {
      if (!validateImgUrl(articleData.topicExist)) {
        newErrors.topicImgUrl = "Invalid image URL";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });

    if (name === "topic" && !topicExist) {
      setTopicExist(true);
    }

    if (errors[name]) {
      setErrors((prevErrors) => {
        delete prevErrors[name];
        return { ...prevErrors };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid && topics.includes(articleData.topic)) {
      setIsPosting(true);
      postArticle(articleData)
        .then(() => {
          setPostSuccess(true);
          setArticleData({
            title: "",
            topic: "",
            body: "",
            articleImgUrl: "",
            author: user,
            topicDescription: "",
            topicImgUrl: "",
          });
          setTimeout(() => setPostSuccess(false), 3000);
        })
        .catch((error) => {
          setErrors(error);
          setTimeout(() => setErrors({}), 3000);
        })
        .finally(() => setIsPosting(false));
    } else if (isValid && articleData.topicDescription) {
      setIsPosting(true);
      postTopic({
        slug: articleData.topic,
        description: articleData.topicDescription,
        img_url: articleData.topicImgUrl || "",
      })
        .then(() => {
          postArticle({
            title: articleData.title,
            topic: articleData.topic,
            author: user,
            body: articleData.body,
            article_img_url: articleData.articleImgUrl,
          });
        })
        .then(() => {
          setPostSuccess(true);
          setArticleData({
            title: "",
            topic: "",
            body: "",
            articleImgUrl: "",
            author: user,
            topicDescription: "",
            topicImgUrl: "",
          });
          setTimeout(() => setPostSuccess(false), 3000);
        })
        .catch((error) => {
          setErrors(error);
          setTimeout(() => setErrors({}), 3000);
        })
        .finally(() => setIsPosting(false));
    } else if (isValid && !topics.includes(articleData.topic)) {
      setTopicExist(false);
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          message:
            "Topic does not exist. Please add topic description before continuing!",
        };
      });
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
          />
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
          />
          <div className="error">
            {errors.topic && <p className="error-message">{errors.topic}</p>}
          </div>
        </div>

        {!topicExist && (
          <>
            <div className="article-form__field">
              <label htmlFor="topic-description">Topic Description:</label>
              <input
                className="article-form__input"
                type="text"
                name="topicDescription"
                id="topic-description"
                value={articleData.topicDescription}
                onChange={handleChange}
              />
              <div className="error">
                {errors.topicDescription && (
                  <p className="error-message">{errors.topicDescription}</p>
                )}
              </div>
            </div>
            <div className="article-form__field">
              <label htmlFor="topic-image">Topic Image URL (Optional):</label>
              <input
                className="article-form__input"
                type="text"
                name="topicImgUrl"
                id="topic-image"
                value={articleData.topicImgUrl}
                onChange={handleChange}
              />
              <div className="error">
                {errors.topicImgUrl && (
                  <p className="error-message">{errors.topicImgUrl}</p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="article-form__field">
          <label htmlFor="body">Content:</label>
          <textarea
            className="article-form__input article-form__body-input"
            type="text"
            name="body"
            id="body"
            value={articleData.body}
            onChange={handleChange}
          />
          <div className="error">
            {errors.body && <p className="error-message">{errors.body}</p>}
          </div>
        </div>
        <div className="article-form__field">
          <label htmlFor="article image">Image URL (Optional):</label>
          <input
            className="article-form__input article-form__img-url"
            type="text"
            name="articleImgUrl"
            id="article image"
            value={articleData.articleImgUrl}
            onChange={handleChange}
          />
          <div className="error">
            {errors.articleImgUrl && (
              <p className="error-message">{errors.articleImgUrl}</p>
            )}
          </div>
        </div>
        {isPosting ? (
          <LoadingSpinner />
        ) : (
          <button className="article-form__btn" type="submit">
            Post Article
          </button>
        )}
        <div className="user-feedback">
          {postSuccess && (
            <p className="success-message">Your article has been posted!</p>
          )}
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>
      </form>
    </>
  );
};
