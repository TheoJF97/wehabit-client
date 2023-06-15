import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

// import SASS
import "./App.scss";

export default function App() {
  return (
    <div className="App">
      <h1>hello</h1>

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}
