import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddHabit({ currentUserId }) {
  const navigate = useNavigate();

  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const newHabit = {
      title: event.target.title.value,
      description: event.target.description.value,
      user_id: currentUserId,
    };

    axios
      .post(`${serverUrl}/habits`, newHabit)
      .then(() => {
        navigate(`/user/${currentUserId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="addhabit">
        <div className="addhabit__card">
          <h1 className="addhabit__header">AddHabit</h1>
          <form className="addhabit__form" onSubmit={onSubmitHandler}>
            <div className="addhabit__title">
              <label htmlFor="title" className="addhabit__title-label">
                Title:
              </label>
              <input
                type="text"
                name="title"
                className="addhabit__title-input"
                placeholder="Ex: Journaling"
              />
            </div>

            <div className="addhabit__description">
              <label
                htmlFor="description"
                className="addhabit__description-label"
              >
                Description:
              </label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                className="addhabit__description-input"
                placeholder="Ex: I want to write the highlights/lowlights of my day every night after brushing my teeth, before bed. "
              ></textarea>
            </div>

            <div className="addhabit__button-container">
              <button className="addhabit__button">Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
