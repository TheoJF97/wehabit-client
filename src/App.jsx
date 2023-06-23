// import tools
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import SASS
import "./App.scss";

// import Pages
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AddHabitPage from "./pages/AddHabitPage.jsx/AddHabitPage";
import LandingPage from "./pages/LandingPage/LandingPage";


export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:id" element={<ProfilePage />} />
          <Route path="/addhabit" element={<AddHabitPage />} />
        </Routes>
      </Router>
    </div>
  );
}
