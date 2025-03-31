import { Header } from "./components/Header";
import { ArticleList } from "./components/ArticleList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
    </>
  );
}

export default App;
