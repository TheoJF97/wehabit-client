import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Habit({ habit }) {
  //Deconstruct prop habit (id, name, email) for name:
  const { title, id } = habit;

  //State variables
  const [completions, setCompletions] = useState([]);
  const [hasError, setHasError] = useState(false);

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
  }, []);

  if (!completions) {
    return <span>Loading.....</span>;
  }

  console.log(`${id} ${completions}`);

  if (hasError) {
    return <h1>Information not found</h1>;
  }

  return (
    <>
      <div key={id} className="habit__habit">
        <h2 className="habit__title">{title}</h2>
        <input
          type="checkbox"
          id="check"
          className="habit__check"
          onChange={(e) => setCompletions(e.target.value)}
        />
        <input type="checkbox" id="check" className="habit__check" />
        <input type="checkbox" id="check" className="habit__check" />
        <input type="checkbox" id="check" className="habit__check" />
        <input type="checkbox" id="check" className="habit__check" />
        <input type="checkbox" id="check" className="habit__check" />
        <input type="checkbox" id="check" className="habit__check" />
      </div>
    </>
  );
}
