// import tools
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// import SASS
import "./App.scss";

// import Pages
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AddHabitPage from "./pages/AddHabitPage.jsx/AddHabitPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import TheirHabitsPage from "./pages/TheirHabitsPage/TheirHabitsPage";

export default function App() {
  //State variables
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  //Axios call to get all user's habits completions for a date range
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

  console.log(users);

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/:id" element={<ProfilePage />} />
          <Route path="/addhabit" element={<AddHabitPage />} />
          <Route
            path="/theirhabits"
            element={<TheirHabitsPage users={users} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
