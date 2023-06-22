//Import tools
import axios from "axios";
import { useEffect, useState } from "react";

// Note: Dates is an array of strings representing range of dates
import { currentMonthYear, startDate, endDate, dates } from "../../utils/utils";

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
        console.log(response.data);
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
        {completions.map((completion, index) => {
          return (
            <input
              key={index}
              type="checkbox"
              checked={completion.completed === 1}
              className="habit__check"
              onChange={(e) => {
                const updatedCompletions = [...completions];
                updatedCompletions[index].completed = e.target.checked ? 1 : 0;
                setCompletions(updatedCompletions);

                //Axios call to post a completion
                axios
                  .post(`${serverUrl}/completions`)
                  .then(() => {
                    console.log("success");
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
