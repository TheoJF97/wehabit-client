import axios from "axios";
import { useParams } from "react-router-dom";

export default function SendEncourageMint({ currentUserId }) {
  // Grab id
  let { id } = useParams();

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

   const onSubmitHandler = (event) => {
    event.preventDefault();

    const newEncourageMint = {
      content: event.target.encouragemint.value,
    };

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
