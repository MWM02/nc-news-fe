import { useState, useEffect, useRef } from "react";
import { capitalise } from "../../utils/utils";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

export const FilterMenu = ({ setSearchParams, sortBy, orderBy, topic }) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterMenuRef = useRef();
  const sortByFields = [
    "created_at",
    "author",
    "title",
    "topic",
    "votes",
    "comment_count",
  ];

  useEffect(() => {
    const handler = (e) => {
      if (!filterMenuRef.current.contains(e.target)) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (key, value, currValue) => {
    if (value !== currValue) {
      setSearchParams((prev) => {
        prev.set("p", 1);
        prev.set(key, value);
        return prev;
      });
    }
  };

  return (
    <div className="dropdown">
      <button
        className={`dropdown__btn ${
          showFilterMenu ? "dropdown__btn--active" : "dropdown__btn--inactive"
        }`}
        onClick={() => setShowFilterMenu((prev) => !prev)}
      >
        Filters
        {showFilterMenu ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
      </button>
      <div
        className={`dropdown__content ${
          showFilterMenu
            ? "dropdown__content--active"
            : "dropdown__content--inactive"
        }`}
        ref={filterMenuRef}
      >
        <fieldset>
          <legend>Order by</legend>
          <input
            type="radio"
            id="asc"
            name="order-by"
            value="asc"
            checked={orderBy === "asc"}
            onChange={(e) => handleChange("order_by", e.target.value, orderBy)}
          />
          <label htmlFor="asc">Ascending</label>
          <input
            type="radio"
            id="desc"
            name="order-by"
            value="desc"
            checked={orderBy === "desc"}
            onChange={(e) => handleChange("order_by", e.target.value, orderBy)}
          />
          <label htmlFor="desc">Descending</label>
        </fieldset>
        <fieldset>
          <legend>Sort by</legend>
          {sortByFields.map((sortByField) => {
            return (
              (sortByField !== "topic" || !topic) && (
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
              )
            );
          })}
        </fieldset>
      </div>
    </div>
  );
};
