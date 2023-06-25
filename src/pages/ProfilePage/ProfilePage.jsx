// Import components
import EncourageMints from "../../components/EncourageMints/EncourageMints";
import Header from "../../components/Header/Header";
import MyHabits from "../../components/MyHabits/MyHabits";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  // Grab id
  let { id } = useParams();

  // Axios call to get the user information
  useEffect(() => {
    axios
      .get(`${serverUrl}/users/${id}`)
      .then((response) => {
        setUser(response.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, [id, serverUrl]);

  console.log(user);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (hasError) {
    return <h1>Information not found</h1>;
  }

  return (
    <>
      <Header user={user} />
      <MyHabits user={user} />
      <EncourageMints />
    </>
  );
}
