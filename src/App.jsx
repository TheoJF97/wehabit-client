// import tools
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Pages
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AddHabitPage from "./pages/AddHabitPage.jsx/AddHabitPage";

// import SASS
import "./App.scss";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/:id" element={<ProfilePage />} />
          <Route path="/addhabit" element={<AddHabitPage />} />
        </Routes>
      </Router>
    </div>
  );
}
