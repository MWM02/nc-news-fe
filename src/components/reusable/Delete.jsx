export const Delete = ({
  apiFunction,
  commentId,
  setIsDeleted,
  setDeleteMessage,
}) => {
  const handleClick = () => {
    setDeleteMessage("Deleting...");
    apiFunction(commentId)
      .then(() => setIsDeleted(true))
      .catch(() => {
        setDeleteMessage("Delete failed. Please try again.");
        setTimeout(() => {
          setDeleteMessage("");
        }, 2500);
      });
  };

  return (
    <button className="delete__btn" onClick={handleClick}>
      Delete
    </button>
  );
};
