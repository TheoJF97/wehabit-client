import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

// import SASS
import "./App.scss";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:id" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}
