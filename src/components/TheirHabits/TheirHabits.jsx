import axios from "axios";
import { useEffect, useState } from "react";
import Habit from "../Habit/Habit";
import { currentMonthYear, dates } from "../../utils/utils";

export default function TheirHabits({ user, currentUserId }) {
  //Deconstruct prop user (id, name, email) for name:
  const { id, name } = user;

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

  // useEffect(() => {
  //   const fetchHabits = async () => {
  //     try {
  //       const response = await axios.get(`${serverUrl}/users/${id}/habits`);
  //       const filteredHabits = response.data.filter(
  //         (habit) => habit.user_id !== currentUserId
  //       );
  //       console.log(filteredHabits);
  //       setHabits(filteredHabits);
  //     } catch (error) {
  //       console.log(error);
  //       setHasError(true);
  //     }
  //   };

  //   fetchHabits();
  // }, [id, currentUserId, serverUrl]);

  if (hasError) {
    return <h1>Error fetching habits</h1>;
  }

  return (
    <>
      <section className="their-habits">
        <div className="their-habits__header">
          <h1 className="their-habits__username">{name}</h1>
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

                {dates.map((date, index) => (
                  <span key={index} className="their-habits__date">
                    {date}
                  </span>
                ))}
              </div>

              {habits.map((habit, habitId) => (
                <Habit habit={habit} key={habitId} />
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
