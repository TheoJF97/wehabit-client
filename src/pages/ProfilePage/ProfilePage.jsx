// Import components
import { useParams } from "react-router-dom";
import EncourageMints from "../../components/EncourageMints/EncourageMints";
import Header from "../../components/Header/Header";
import MyHabits from "../../components/MyHabits/MyHabits";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(null);
  const [hasError, setHasError] = useState(false);

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  // Grab id
  let { id } = useParams();

  //Axios call to get a user's id
  useEffect(() => {
    axios
      .get(`${serverUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.authToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.userId);
        setUserId(response.data.userId);
        // setUser(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, [id, serverUrl]);

  if (!user) {
    return <span>Loading.....</span>;
  }
  if (hasError) {
    return <h1>Information not found</h1>;
  }

  return (
    <>
      <Header />
      <MyHabits user={user} />
      <EncourageMints />
    </>
  );
}
