import { useState } from "react";
import { capitalise } from "../../utils/utils";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import "./Filters.css";

export const FilterMenu = ({ setSearchParams, sortBy, orderBy }) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const sortByFields = [
    "created_at",
    "author",
    "title",
    "topic",
    "votes",
    "comment_count",
  ];

  const handleChange = (key, value, currValue) => {
    if (value !== currValue) {
      setSearchParams((prev) => {
        prev.set("p", 1);
        value ? prev.set(key, value) : prev.delete(key);
        return prev;
      });
    }
  };

  return (
    <div className="dropdown">
      <button
        className="dropdown__btn"
        onClick={() => setShowFilterMenu((prev) => !prev)}
      >
        Filters
        {showFilterMenu ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
      </button>
      {showFilterMenu && (
        <div className="dropdown__content">
          <fieldset>
            <legend>Order by</legend>
            <input
              type="radio"
              id="asc"
              name="order-by"
              value="asc"
              checked={orderBy === "asc"}
              onChange={(e) =>
                handleChange("order_by", e.target.value, orderBy)
              }
            />
            <label htmlFor="asc">Ascending</label>
            <input
              type="radio"
              id="desc"
              name="order-by"
              value="desc"
              checked={orderBy == "desc"}
              onChange={(e) =>
                handleChange("order_by", e.target.value, orderBy)
              }
            />
            <label htmlFor="desc">Descending</label>
          </fieldset>
          <fieldset>
            <legend>Sort by</legend>
            {sortByFields.map((sortByField) => {
              return (
                <div key={sortByField}>
                  <input
                    type="radio"
                    id={sortByField}
                    name="sort-by"
                    value={sortByField}
                    checked={sortBy === sortByField}
                    onChange={(e) =>
                      handleChange("sort_by", e.target.value, sortBy)
                    }
                  />
                  <label htmlFor={sortByField}>
                    {capitalise(sortByField).replace("_", " ")}
                  </label>
                </div>
              );
            })}
          </fieldset>
        </div>
      )}
    </div>
  );
};
