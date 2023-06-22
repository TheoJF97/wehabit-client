import axios from "axios";
import { useEffect, useState } from "react";

export default function Habit({ habit }) {
  //State variables
  const [completions, setCompletions] = useState([]);
  const [hasError, setHasError] = useState(false);

  //Deconstruct prop: habit (id, title, user_id):
  const { id, title } = habit;

  //Deconstruct state variable: completions (id, habit_id, date, completed)
  // const { habit_id, date, completed } = completions;

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  //Axios call to get a user's habits
  useEffect(() => {
    axios
      .get(`${serverUrl}/habits/${id}/completions`)
      .then((response) => {
        setCompletions(response.data);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, [id, serverUrl]);

  if (completions.length === 0) {
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

                //Axios call to put a completion
                axios
                  .put(`${serverUrl}/completions/${completion.id}`)
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
