import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { ArticleList } from "./components/article_list/ArticleList";
import { Article } from "./components/article/Article";
import { ArticleForm } from "./components/article_form/ArticleForm";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/post-article" element={<ArticleForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
