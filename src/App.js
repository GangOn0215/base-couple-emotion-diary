import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// component
import Header from "./Components/Header";
// diary
import DiaryList from "./Components/Diary/List";
import DiaryEditor from "./Components/Diary/Editor";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <article className="diary">
          <Routes>
            <Route path="/" element={<DiaryList />} />
            <Route path="/write" element={<DiaryEditor />} />
          </Routes>
        </article>
      </div>
      <footer></footer>
    </BrowserRouter>
  );
}

export default App;
