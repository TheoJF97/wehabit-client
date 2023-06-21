import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddHabit() {
  const navigate = useNavigate();

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  //handle submit
  const onSubmitHandler = (event) => {
    //prevent refresh
    event.preventDefault();

    const newHabit = {
      title: event.target.title.value,
      user_id: 1,
    };

    //add the habit
    axios
      .post(`${serverUrl}/habits`, newHabit)
      .then(() => {
        navigate("/1");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="addhabit" onSubmit={onSubmitHandler}>
        <h1 className="addhabit__header">AddHabit</h1>

        <div className="addhabit__inputs">
          <label htmlFor="Title" className="addhabit__label">
            Title
          </label>
          <input
            type="text"
            htmlFor="Title"
            name="title"
            className="addhabit__input"
          />
          <button className="addhabit__submit">Submit</button>
        </div>
      </form>
    </>
  );
}
