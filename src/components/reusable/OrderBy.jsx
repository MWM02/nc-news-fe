import { RiArrowDropDownLine } from "react-icons/ri";
import "./Filters.css";

export const OrderBy = ({ setSearchParams, order }) => {
  const orderBy = [
    { value: "desc", label: "Descending" },
    { value: "asc", label: "Ascending" },
  ];
  const currentOrderLabel = orderBy.find(
    (orderObj) => orderObj.value === order
  ).label;

  const handleClick = (e) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("p", 1);
      e.target.value
        ? prevSearchParams.set("order", e.target.value)
        : prevSearchParams.delete("order");
      return prevSearchParams;
    });
  };

  return (
    <div className="dropdown">
      <button className="dropdown__btn">
        Ordered by: {currentOrderLabel}
        <RiArrowDropDownLine />
      </button>
      <div className="dropdown__content">
        {orderBy.map(({ label, value }) => (
          <button
            className="dropdown__item"
            key={value}
            value={value}
            onClick={handleClick}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
