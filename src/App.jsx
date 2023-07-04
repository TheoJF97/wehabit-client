// import tools
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// import SASS
import "./App.scss";

// import components
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AddHabitPage from "./pages/AddHabitPage/AddHabitPage";
import TheirHabitsPage from "./pages/TheirHabitsPage/TheirHabitsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage2 from "./pages/SignUpPage/SignUpPage2";
import TheirHabitsProfilePage from "./pages/TheirHabitsProfilePage/TheirHabitsProfilePage";
import HabitDetailsPage from "./pages/HabitDetailsPage/HabitDetailsPage";

export default function App() {
  const [currentUserId, setCurrentUserId] = useState(() => {
    const storedUserId = sessionStorage.getItem("currentUserId");
    return storedUserId ? parseInt(storedUserId) : null;
  });
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  useEffect(() => {
    axios
      .get(`${serverUrl}/users/`)
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, [serverUrl]);

  useEffect(() => {
    // Update the currentUserId in sessionStorage whenever it changes
    sessionStorage.setItem("currentUserId", currentUserId);
  }, [currentUserId]);

  if (isLoading) {
    return <span>Loading.....</span>;
  }

  if (hasError) {
    return <h1>Information not found</h1>;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage2 />} />
          <Route
            path="/login"
            element={<LoginPage setCurrentUserId={setCurrentUserId} />}
          />
          <Route path="/:id" element={<ProfilePage />} />
          <Route
            path="/habit/:id"
            element={
              <HabitDetailsPage currentUserId={currentUserId} users={users} />
            }
            currentUserId={currentUserId}
          />
          <Route
            path="/addhabit"
            element={
              <AddHabitPage currentUserId={currentUserId} users={users} />
            }
            currentUserId={currentUserId}
          />

          <Route
            path="/theirhabits"
            element={
              <TheirHabitsPage currentUserId={currentUserId} users={users} />
            }
          />
          <Route
            path="/theirhabits/:id"
            element={
              <TheirHabitsProfilePage
                currentUserId={currentUserId}
                users={users}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
