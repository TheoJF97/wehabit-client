import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Habit from "../Habit/Habit";

export default function MyHabits({ user }) {
  //Deconstruct prop user (id, name, email) for name:
  const { name } = user;

  //Function to getCurrentWeekDates that outputs an array of obejcts where each object is a day
  function getCurrentWeekDates() {
    const today = new Date();
    const currentDay = today.getDay(); // Get the current day of the week (0-6, where 0 is Sunday)
    const firstDayOfWeek = new Date(today); // Create a new date object with the current date
    firstDayOfWeek.setDate(today.getDate() - currentDay); // Subtract the current day to get the first day of the week

    const weekDates = [];
    const weekdays = ["Su", "M", "T", "W", "Th", "F", "Sa"]; // Array of short form initials for weekdays

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i); // Add the loop index to get each day of the week
      const day = weekdays[i]; // Get the short form initial for the weekday
      const formattedDate = `${date.getDate()} ${day}`; // Format the date as "date weekdayInitial"
      weekDates.push(formattedDate);
    }

    return weekDates;
  }

  const weekDates = getCurrentWeekDates();

  // function to get current month + year
  function getCurrentMonthYear() {
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" }); // Get the current month as a string
    const year = today.getFullYear(); // Get the current year

    return `${month} ${year}`; // Return the current month and year as a formatted string
  }

  const currentMonthYear = getCurrentMonthYear();

  //State variables
  const [habits, setHabits] = useState([]);
  const [hasError, setHasError] = useState(false);

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  // Grab id
  let { id } = useParams();

  //Axios call to get a user's habits
  useEffect(() => {
    axios
      .get(`${serverUrl}/users/${id}/habits`)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, []);

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

            {weekDates.map((date, index) => (
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
