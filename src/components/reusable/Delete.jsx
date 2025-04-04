export const Delete = ({ apiFunction, id, setIsDeleted, setDeleteMessage }) => {
  const handleClick = () => {
    setDeleteMessage("Deleting...");
    apiFunction(id)
      .then(() => setIsDeleted(true))
      .catch(() => {
        setDeleteMessage("Delete failed. Please try again.");
        setTimeout(() => {
          setDeleteMessage("");
        }, 2500);
      });
  };

  return <button onClick={handleClick}>Delete</button>;
};
