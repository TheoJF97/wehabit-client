import HabitDetails from "../../components/HabitDetails/HabitDetails";
import Header from "../../components/Header/Header";

export default function HabitDetailsPage({ currentUserId, users }) {
  const currentUser = users.find((user) => {
    return user.id === currentUserId;
  });

  return (
    <>
      <Header currentUser={currentUser} />
      <HabitDetails />
    </>
  );
}
