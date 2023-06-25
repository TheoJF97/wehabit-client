import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Habit from "../Habit/Habit";
import { currentMonthYear, dates } from "../../utils/utils";
import { useParams } from "react-router-dom";

export default function MyHabits({ user }) {
  //Deconstruct prop user (id, name, email) for name:
  const { name } = user;

  // Grab id
  let { id } = useParams();

  //State variables
  const [habits, setHabits] = useState([]);
  const [hasError, setHasError] = useState(false);

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  //Axios call to get a user's habits
  useEffect(() => {
    axios
      .get(`${serverUrl}/users/${id}/habits`)
      .then((response) => {
        if (response.data.length === 0) {
          // No Habits found for the user
          setHabits([]);
        } else {
          setHabits(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, [id, serverUrl]);

  if (!habits) {
    return <span>Loading.....</span>;
  }

  if (hasError) {
    return <h1>Information not found</h1>;
  }

  return (
    <>
      <section className="myhabits">
        <div className="myhabits__header">
          <h1 className="myhabits__username">MyHabits - {name}</h1>
          <Link to="/addhabit">
            <button className="myhabits__add-habit">+ AddHabit</button>
          </Link>
        </div>
        <div className="myhabits__container">
          <div className="myhabits__dates">
            <h2 className="myhabits__title myhabits__title-date">
              {currentMonthYear}
            </h2>

            {dates.map((date, index) => (
              <span key={index} className="myhabits__date">
                {date}
              </span>
            ))}
          </div>

          {habits.map((habit, habitId) => (
            <Habit habit={habit} key={habitId} />
          ))}
        </div>
      </section>
    </>
  );
}
