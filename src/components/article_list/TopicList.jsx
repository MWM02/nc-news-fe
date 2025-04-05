import useApiRequest from "../../custom_hooks/useApiRequest";
import { capitalise } from "../../utils/utils";
import { getTopics } from "../../api";

export const TopicList = ({ setSearchParams, topic }) => {
  const { data, isLoading, error } = useApiRequest(getTopics);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <label htmlFor="topics">Select Topic:</label>
      <select
        className="dropdown"
        id="topics"
        value={topic || ""}
        onChange={(e) => {
          setSearchParams((prevSearchParams) => {
            prevSearchParams.set("p", 1);
            e.target.value
              ? prevSearchParams.set("topic", e.target.value)
              : prevSearchParams.delete("topic");
            return prevSearchParams;
          });
        }}
      >
        <option key="default" value="">
          All topics
        </option>
        {data.topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {capitalise(topic.slug)}
          </option>
        ))}
      </select>
    </div>
  );
};
