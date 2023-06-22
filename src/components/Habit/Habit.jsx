import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Habit({ habit }) {
  //State variables
  const [completions, setCompletions] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [completion, setCompletion] = useState(true);

  //Deconstruct prop: habit (id, title, user_id):
  const { id, title } = habit;

  //Deconstruct state variable: completions (id, habit_id, date, completed)
  const { habit_id, date, completed } = completions;

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  //Axios call to get a user's habits
  useEffect(() => {
    axios
      .get(`${serverUrl}/habits/${id}/completions`)
      .then((response) => {
        setCompletions(response.data);

        // outputs an array of objects completions for habit_id 1-3 for dates: 6/18-6/24
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, []);

  if (completions.length === 0) {
    return <span>Loading.....</span>;
  }

  console.log(completions);

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
              }}
            />
          );
        })}
      </div>
    </>
  );
}
