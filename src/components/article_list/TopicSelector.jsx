import { useState, useEffect, useRef } from "react";
import { capitalise } from "../../utils/utils";
import { getTopics } from "../../api";
import { LoadingSpinner } from "../reusable/LoadingSpinner";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import useApiRequest from "../../custom_hooks/useApiRequest";

export const TopicSelector = ({ setSearchParams, topic }) => {
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const { data, isLoading, error } = useApiRequest(getTopics);
  const topicSelectorRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!topicSelectorRef.current.contains(e.target)) {
        setShowTopicSelector(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (key, value, currValue) => {
    if (value !== currValue) {
      setSearchParams((prev) => {
        prev.set("p", 1);
        value !== "allTopics" ? prev.set(key, value) : prev.delete(key);
        return prev;
      });
    }
  };

  return (
    <div className="dropdown">
      <button
        className={`dropdown__btn ${
          showTopicSelector
            ? "dropdown__btn--active"
            : "dropdown__btn--inactive"
        }`}
        onClick={() => setShowTopicSelector((prev) => !prev)}
      >
        Topics
        {showTopicSelector ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
      </button>

      <div
        className={`dropdown__content ${
          showTopicSelector
            ? "dropdown__content--active"
            : "dropdown__content--inactive"
        }`}
        ref={topicSelectorRef}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {!error ? (
              <>
                <div>
                  <input
                    type="radio"
                    id="allTopics"
                    name="topic"
                    value={"allTopics"}
                    checked={topic === ""}
                    onChange={(e) =>
                      handleChange("topic", e.target.value, topic)
                    }
                  />
                  <label htmlFor="allTopics">All Topics</label>
                </div>
                {data.topics.map(({ slug }) => {
                  return (
                    <div key={slug}>
                      <input
                        type="radio"
                        id={slug}
                        name="topic"
                        value={slug}
                        checked={topic === slug}
                        onChange={(e) =>
                          handleChange("topic", e.target.value, topic)
                        }
                      />
                      <label htmlFor={slug}>{capitalise(slug)}</label>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="error-message">
                {error.response?.data?.error?.message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
