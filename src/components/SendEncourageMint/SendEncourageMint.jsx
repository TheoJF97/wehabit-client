import axios from "axios";
import { useParams } from "react-router-dom";

export default function SendEncourageMint({ currentUserId }) {
  // PSEUDO:
  // get target id which is id from useParams
  // get author which is the currentUserId
  // POST: serverUrl/:author_id/:target_id
  // send: content
  // Grab id
  let { id } = useParams();

  console.log(currentUserId);
  console.log(id);

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  //handle submit
  const onSubmitHandler = (event) => {
    //prevent refresh
    event.preventDefault();

    const newEncourageMint = {
      content: event.target.encouragemint.value,
    };

    //send encouragemint
    axios
      .post(
        `${serverUrl}/encouragemints/${currentUserId}/${id}`,
        newEncourageMint
      )
      .then(() => {
        console.log("EncourageMint added successfully!");
        event.target.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form className="send-encouragemint" onSubmit={onSubmitHandler}>
        <h1 className="send-encouragemint__header">Send Encouragemint 🍬</h1>

        <div className="send-encouragemint__inputs">
          <label htmlFor="encouragemint" className="send-encouragemint__label">
            🍬
          </label>
          <textarea
            name="encouragemint"
            cols="30"
            rows="10"
            className="send-encouragemint__input"
          ></textarea>
          <button className="send-encouragemint__submit">Submit</button>
        </div>
      </form>
    </>
  );
}
