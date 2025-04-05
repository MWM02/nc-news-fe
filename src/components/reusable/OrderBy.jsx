export const OrderBy = ({ setSearchParams, order }) => {
  const orderBy = [
    { value: "desc", label: "Descending" },
    { value: "asc", label: "Ascending" },
  ];

  const handleChange = (e) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("p", 1);
      e.target.value
        ? prevSearchParams.set("order", e.target.value)
        : prevSearchParams.delete("order");
      return prevSearchParams;
    });
  };

  return (
    <div>
      <label htmlFor="order">Order By:</label>
      <select
        className="dropdown"
        id="order"
        value={order || ""}
        onChange={(e) => {
          handleChange(e);
        }}
      >
        {orderBy.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
