import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HabitDetails() {
  const [habit, setHabit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  let { id } = useParams();

  console.log(id);

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
          <h1 className="habit-details__header">{habit.title}</h1>
          <div className="habit-details__description">
            <h2 className="habit-details__description-header">Description</h2>
          </div>
          <p className="habit-details__description-content">
            {habit.description}
          </p>

          <div className="habit-details__button-container">
            <button className="habit-details__button">◀ Back</button>
          </div>
        </div>
      </section>
    </>
  );
}
