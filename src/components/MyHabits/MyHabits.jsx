import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Habit from "../Habit/Habit";
import { currentMonthYear, formattedDates } from "../../utils/utils";
import { useParams } from "react-router-dom";

export default function MyHabits({ currentUser }) {
  const { name } = currentUser;

  let { id } = useParams();

  const [habits, setHabits] = useState([]);
  const [hasError, setHasError] = useState(false);

  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  useEffect(() => {
    axios
      .get(`${serverUrl}/users/${id}/habits`)
      .then((response) => {
        if (response.data.length === 0) {
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
            <h2 className="myhabits__month-year">
              {currentMonthYear}
            </h2>

            {formattedDates.map((date, index) => (
              <span key={index} className="myhabits__date">
                {date}
              </span>
            ))}
          </div>

          {habits.map((habit, habitId) => (
            <Habit habit={habit} key={habitId} isMyHabits={true} />
          ))}
        </div>
      </section>
    </>
  );
}
