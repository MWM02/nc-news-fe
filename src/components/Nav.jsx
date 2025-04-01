import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <Link to={`/articles`}>Home</Link>
      <>Post Article</>
    </nav>
  );
};
