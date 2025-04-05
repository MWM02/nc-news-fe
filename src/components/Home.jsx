import { useContext } from "react";
import { UserContext } from "../contexts/Users";

export const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <h2>Welcome back, {user}!</h2>
    </>
  );
};
