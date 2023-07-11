import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import trash from "../../assets/icons/trash-solid.svg";

export default function HabitDetails({ currentUserId }) {
  const [habit, setHabit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${serverUrl}/habits/${id}`)
      .then((response) => {
        setHabit(response.data[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
  }, [id, serverUrl]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (hasError) {
    return <h1>Information not found</h1>;
  }

  return (
    <>
      <section className="habit-details">
        <div className="habit-details__card">
          <div className="habit-details__header">
            <h1 className="habit-details__title">{habit.title}</h1>
            {/* <button className="habit-details__delete"> */}
              <img
                src={trash}
                alt="garbage can"
                className="habit-details__trash"
              />
            {/* </button> */}
          </div>
          <div className="habit-details__description">
            <h2 className="habit-details__description-header">Description</h2>
          </div>
          <p className="habit-details__description-content">
            {habit.description}
          </p>
          <Link to={`/user/${currentUserId}`} className="habit-details__link">
            <div className="habit-details__button-container">
              <button className="habit-details__button">◀ Back</button>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
