import useApiRequest from "../../custom_hooks/useApiRequest";
import { capitalise } from "../../utils/utils";
import { getTopics } from "../../api";
import { RiArrowDropDownLine } from "react-icons/ri";
import "../reusable/Filters.css";

export const TopicList = ({ setSearchParams, topic }) => {
  const { data, isLoading, error } = useApiRequest(getTopics);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleClick = (e) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("p", 1);
      e.target.value
        ? prevSearchParams.set("topic", e.target.value)
        : prevSearchParams.delete("topic");
      return prevSearchParams;
    });
  };

  return (
    <div className="dropdown">
      <button className="dropdown__btn">
        Topic: {topic ? capitalise(topic) : "All topics"}
        <RiArrowDropDownLine />
      </button>
      <div className="dropdown__content">
        <button
          className="dropdown__item"
          key="default"
          value=""
          onClick={handleClick}
        >
          All topics
        </button>
        {data.topics.map((topic) => (
          <button
            className="dropdown__item"
            key={topic.slug}
            value={topic.slug}
            onClick={handleClick}
          >
            {capitalise(topic.slug)}
          </button>
        ))}
      </div>
    </div>
  );
};
