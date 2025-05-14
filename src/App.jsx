import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Articles } from "./components/article_list/Articles";
import { Article } from "./components/article/Article";
import { ArticleForm } from "./components/article_form/ArticleForm";
import { ErrorPage } from "./components/ErrorPage";
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
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/post-article" element={<ArticleForm />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
