import axios from "axios";
import { useEffect, useState } from "react";
import { startDate, endDate, dates } from "../../utils/utils";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Habit({ habit, isMyHabits }) {
  const [completions, setCompletions] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { id, title } = habit;

  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  useEffect(() => {
    axios
      .get(`${serverUrl}/completions/${id}/${startDate}/${endDate}`)
      .then((response) => {
        setCompletions(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, [id, serverUrl]);

  if (isLoading) {
    return <span>Loading.....</span>;
  }

  if (hasError) {
    return <h1>Information not found</h1>;
  }

  return (
    <>
      <div key={id} className="habit">
        {/* To create link to Habit Details Page */}
        <Link to={`/habit/${id}`} className="habit__link">
          <h2 className="habit__title">{title}</h2>
        </Link>

        {dates.map((date, index) => {
          // c represents a completion of completions
          const completion = completions.find(
            (c) => moment(c.date).format("YYYY-MM-DD") === date
          );

          const isChecked = completion ? 1 : false;

          return (
            <input
              key={index}
              type="checkbox"
              checked={isChecked}
              className={`${
                isMyHabits
                  ? "habit__check"
                  : "habit__check habit__check--disabled"
              }`}
              onChange={(e) => {
                if (isMyHabits) {
                  // Handle checkbox interaction only in MyHabits
                  const updatedCompletions = [...completions];
                  const existingCompletion = updatedCompletions.find(
                    (c) => c.date === date
                  );
                  if (existingCompletion) {
                    existingCompletion.completed = e.target.checked ? 1 : 0;
                  } else {
                    updatedCompletions.push({
                      date,
                      completed: e.target.checked ? 1 : 0,
                    });
                  }

                  setCompletions(updatedCompletions);

                  axios
                    .post(`${serverUrl}/habits/${id}/completions/${date}`)
                    .then((response) => {
                      console.log(
                        `Completion posted for habit id:${id} on date:${date}`,
                        response
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                      setHasError(true);
                    });
                }
              }}
            />
          );
        })}
      </div>
    </>
  );
}
