import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddHabit({ currentUserId }) {
  const navigate = useNavigate();
  console.log(currentUserId);

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  //handle submit
  const onSubmitHandler = (event) => {
    //prevent refresh
    event.preventDefault();

    const newHabit = {
      title: event.target.title.value,
      user_id: currentUserId,
    };

    //add the habit
    axios
      .post(`${serverUrl}/habits`, newHabit)
      .then(() => {
        navigate(`/${currentUserId}`);
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
