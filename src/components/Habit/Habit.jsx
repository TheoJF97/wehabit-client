//Import tools
import axios from "axios";
import { useEffect, useState } from "react";

// Note: dates is an array of strings representing range of dates from startDate to endDate
import { startDate, endDate, dates } from "../../utils/utils";
import moment from "moment";

export default function Habit({ habit }) {
  //State variables
  const [completions, setCompletions] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //Deconstruct prop: habit (id, title, user_id):
  const { id, title } = habit;

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  //Axios call to get a user's habits completions for a date range
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
      <div key={id} className="habit__habit">
        <h2 className="habit__title">{title}</h2>
        {dates.map((date, index) => {
          // c reresents a completion of completions
          const completion = completions.find(
            (c) => moment(c.date).format("YYYY-MM-DD") === date
          );

          const isChecked = completion ? 1 : false;

          return (
            <input
              key={index}
              type="checkbox"
              checked={isChecked}
              className="habit__check"
              onChange={(e) => {
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
              }}
            />
          );
        })}
      </div>
    </>
  );
}
