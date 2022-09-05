import "./App.css";

// component
// diary
import DiaryEditor from "./Components/Diary/Editor";

function App() {
  return (
    <div className="App">
      <header></header>
      <article className="diary">
        <DiaryEditor />
      </article>
      <footer></footer>
    </div>
  );
}

export default App;
