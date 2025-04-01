import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { ArticleList } from "./components/ArticleList";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
      </Routes>
    </>
  );
}

export default App;
