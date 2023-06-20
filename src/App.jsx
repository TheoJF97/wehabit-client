// import tools
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Pages
import ProfilePage from "./pages/ProfilePage/ProfilePage";

// import SASS
import "./App.scss";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/:id" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}
