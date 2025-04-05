import { capitalise } from "../../utils/utils";

export const SortFilter = ({ setSearchParams, sort_by }) => {
  const sortBy = [
    "created_at",
    "author",
    "title",
    "topic",
    "votes",
    "comment_count",
  ];

  const handleChange = (e) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("p", 1);
      e.target.value
        ? prevSearchParams.set("sort_by", e.target.value)
        : prevSearchParams.delete("sort_by");
      return prevSearchParams;
    });
  };

  return (
    <div>
      <label htmlFor="sort-by">Sort By:</label>
      <select
        className="dropdown"
        id="sort-by"
        value={sort_by || ""}
        onChange={(e) => {
          handleChange(e);
        }}
      >
        {sortBy.map((sortByField) => (
          <option key={sortByField} value={sortByField}>
            {capitalise(sortByField).replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
};
