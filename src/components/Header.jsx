import { Link } from "react-router-dom";
import { Nav } from "./Nav";

export const Header = () => {
  return (
    <header>
      <Link to={`/`}>
        <h1>NC NEWS</h1>
      </Link>
      <Nav />
    </header>
  );
};
