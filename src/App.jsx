import { BrowserRouter as Router, Routes, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";

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
