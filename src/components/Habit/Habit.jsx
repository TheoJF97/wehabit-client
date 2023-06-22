import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Habit({ habit, habitId }) {
  //Deconstruct prop habit (id, name, email) for name:
  const { title, user_id } = habit;

  //State variables
  const [completion, setCompletion] = useState([]);
  const [hasError, setHasError] = useState(false);

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  // Grab id
  let { id } = useParams();

  //handle on change function
  // const handleOnChange = (event) => {
  //   event.preventdefault()
  // };

  //Axios call to get a user's habits
  // useEffect(() => {
  //   axios
  //     .get(`${serverUrl}/users/${id}/habits`)
  //     .then((response) => {
  //       setHabits(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setHasError(true);
  //     });
  // }, []);

  // if (!completion) {
  //   return <span>Loading.....</span>;
  // }

  if (hasError) {
    return <h1>Information not found</h1>;
  }

  return (
    <>
      <div key={habitId} className="habit__habit">
        <h2 className="habit__title">{title}</h2>
        <input
          type="checkbox"
          id="check"
          className="habit__check"
          onChange={(e) => setCompletion(e.target.value)}
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
