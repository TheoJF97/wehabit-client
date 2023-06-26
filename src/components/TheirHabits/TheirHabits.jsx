import axios from "axios";
import { useEffect, useState } from "react";
import Habit from "../Habit/Habit";
import { currentMonthYear, formattedDates } from "../../utils/utils";
import { Link } from "react-router-dom";

export default function TheirHabits({ user, currentUserId }) {
  const { id, name } = user;

  const [habits, setHabits] = useState([]);
  const [hasError, setHasError] = useState(false);

  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  useEffect(() => {
    axios
      .get(`${serverUrl}/users/${id}/habits`)
      .then((response) => {
        const filteredHabits = response.data.filter(
          (habit) => habit.user_id !== currentUserId
        );
        setHabits(filteredHabits);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, [currentUserId, id, serverUrl]);

  if (hasError) {
    return <h1>Error fetching habits</h1>;
  }

  return (
    <>
      <section className="their-habits">
        <div className="their-habits__header">
          <Link
            to={`/theirhabits/${id}`}
            className="their-habits__username-link"
          >
            <h1 className="their-habits__username">{name}</h1>
          </Link>
        </div>

        <div className="their-habits__container">
          {habits.length === 0 ? (
            <h1 className="their-habits__no-habits">No Habits yet!</h1>
          ) : (
            <>
              <div className="their-habits__dates">
                <h2 className="their-habits__title their-habits__title-date">
                  {currentMonthYear}
                </h2>

                {formattedDates.map((date, index) => (
                  <span key={index} className="their-habits__date">
                    {date}
                  </span>
                ))}
              </div>

              {habits.map((habit, habitId) => (
                <Habit habit={habit} key={habitId} isMyHabits={false} />
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
