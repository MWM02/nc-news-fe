import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { ArticleList } from "./components/article_list/ArticleList";
import { Article } from "./components/article/Article";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Nav />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:articleId" element={<Article />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
