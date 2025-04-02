import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { ArticleList } from "./components/article_list/ArticleList";
import { Article } from "./components/article/Article";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:articleId" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
