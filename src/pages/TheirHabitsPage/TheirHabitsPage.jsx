import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import TheirHabits from "../../components/TheirHabits/TheirHabits";

export default function TheirHabitsPage() {
  //State variables
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //Import server url from .env
  const { REACT_APP_SERVER_URL: serverUrl } = process.env;

  //Axios call to get all user 
  useEffect(() => {
    axios
      .get(`${serverUrl}/users/`)
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
      });
  }, [serverUrl]);

  if (isLoading) {
    return <span>Loading.....</span>;
  }

  if (hasError) {
    return <h1>Information not found</h1>;
  }
  return (
    <>
      <Header />

      {users.map((user, userId) => {
        return <TheirHabits user={user} key={userId} />;
      })}
    </>
  );
}
