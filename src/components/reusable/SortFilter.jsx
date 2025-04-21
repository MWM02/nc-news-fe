import { capitalise } from "../../utils/utils";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./Filters.css";

export const SortFilter = ({ setSearchParams, sort_by }) => {
  const sortBy = [
    "created_at",
    "author",
    "title",
    "topic",
    "votes",
    "comment_count",
  ];
  const formattedSortBy = capitalise(sort_by).replace("_", " ");

  const handleClick = (e) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("p", 1);
      e.target.value
        ? prevSearchParams.set("sort_by", e.target.value)
        : prevSearchParams.delete("sort_by");
      return prevSearchParams;
    });
  };

  return (
    <div className="dropdown">
      <button className="dropdown__btn">
        Sorted by: {formattedSortBy}
        <RiArrowDropDownLine />
      </button>
      <div className="dropdown__content" style={{ left: 0 }}>
        {sortBy.map((sortByField) => (
          <button
            className="dropdown__item"
            key={sortByField}
            value={sortByField}
            onClick={handleClick}
          >
            {capitalise(sortByField).replace("_", " ")}
          </button>
        ))}
      </div>
    </div>
  );
};
