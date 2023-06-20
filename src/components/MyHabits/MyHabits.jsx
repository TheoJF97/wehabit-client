import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MyHabits() {
  //Function to getCurrentWeekDates that outputs an array of obejcts where each object is a day
  function getCurrentWeekDates() {
    const today = new Date();
    const currentDay = today.getDay(); // Get the current day of the week (0-6, where 0 is Sunday)
    const firstDayOfWeek = new Date(today); // Create a new date object with the current date
    firstDayOfWeek.setDate(today.getDate() - currentDay); // Subtract the current day to get the first day of the week

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i); // Add the loop index to get each day of the week
      weekDates.push(date);
    }

    return weekDates;
  }

  const weekDates = getCurrentWeekDates();

  //State variables
  const [habits, setHabits] = useState([]);
  const [user, setUser] = useState([]);

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  // set id
  let { id } = useParams();

  //Axios call to get a user's HABITs
  useEffect(() => {
    axios
      .get(`${serverUrl}/users/${id}/habits`)
      .then((response) => {
        setHabits(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Axios call to get a user's name
  useEffect(() => {
    axios
      .get(`${serverUrl}/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(user[0].name);

  return (
    <>
      <section className="myhabits">
        <h1 className="myhabits__header">MyHabits - {user[0].name}</h1>
        <div className="myhabits__container">
          <div className="myhabits__dates">
            <h2 className="myhabits__title myhabits__title--empty">[habit1]</h2>
            {weekDates.map((date, index) => (
              <span key={index} className="myhabits__date">
                {date.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            ))}
          </div>

          {habits.map((habit, index) => (
            <div className="myhabits__habit">
              <h2 key={index} className="myhabits__title">
                {habit.title}
              </h2>
              <input type="checkbox" id="check" className="myhabits__check" />
              <input type="checkbox" id="check" className="myhabits__check" />
              <input type="checkbox" id="check" className="myhabits__check" />
              <input type="checkbox" id="check" className="myhabits__check" />
              <input type="checkbox" id="check" className="myhabits__check" />
              <input type="checkbox" id="check" className="myhabits__check" />
              <input type="checkbox" id="check" className="myhabits__check" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
