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
          <h1 className="habit-details__header">
            test
            {habit.title}
          </h1>
          <form className="habit-details__form">
            <div className="habit-details__title">
              <label htmlFor="title" className="habit-details__title-label">
                Title:
              </label>
              <input
                type="text"
                name="title"
                className="habit-details__title-input"
                placeholder="Ex: Journaling"
              />
            </div>

            <div className="habit-details__description">
              <label
                htmlFor="description"
                className="habit-details__description-label"
              >
                Description:
              </label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                className="habit-details__description-input"
                placeholder="Ex: I want to write the highlights/lowlights of my day every night after brushing my teeth, before bed. "
              ></textarea>
            </div>
            <span>
              test
              {habit.description}
            </span>

            <div className="habit-details__button-container">
              <button className="habit-details__button">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
