import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HabitDetails() {
  const idObj = useParams();

  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  const [habit, setHabit] = useState(null);

  const id = idObj.id;

  useEffect(() => {
    axios
      .get(`${serverUrl}/habits/${id}`)
      .then((event) => {
        setHabit(event.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, serverUrl]);

  // Deconstruct Habit information
  // const { title, description } = habit;

  // console.log(habit);

  return (
    <>
      <section className="habit-details">
        <div className="habit-details__card">
          <h1 className="habit-details__header">{habit.title}</h1>
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
            <span>{habit.description}</span>

            <div className="habit-details__button-container">
              <button className="habit-details__button">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
