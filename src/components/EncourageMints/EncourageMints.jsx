import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EncourageMints() {
  const [encourageMints, setEncourageMints] = useState([]);
  const [hasError, setHasError] = useState(false);

  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${serverUrl}/users/${id}/encouragemints`)
      .then((response) => {
        setEncourageMints(response.data);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, [id, serverUrl, encourageMints]);

  if (!encourageMints) {
    return <span>Loading.....</span>;
  }

  if (hasError) {
    return <h1>Information not found</h1>;
  }

  return (
    <>
      <section className="encouragemints">
        <h1 className="encouragemints__header">EncourageMints 🍬</h1>
        <div className="encouragemints__container">
          {encourageMints.map((encourageMint, index) => (
            <div key={index} className="encouragemints__message">
              <h2 className="encouragemints__author">
                {encourageMint.author_name}
              </h2>
              <p className="encouragemints__content">{encourageMint.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
