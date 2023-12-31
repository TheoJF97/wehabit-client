import EncourageMints from "../../components/EncourageMints/EncourageMints";
import Header from "../../components/Header/Header";
import MyHabits from "../../components/MyHabits/MyHabits";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${serverUrl}/users/${id}`)
      .then((response) => {
        setCurrentUser(response.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
      <Header currentUser={currentUser} />
      <MyHabits currentUser={currentUser} />
      <EncourageMints />
    </>
  );
}
