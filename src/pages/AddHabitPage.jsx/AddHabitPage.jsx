// Import components
import AddHabit from "../../components/AddHabit/AddHabit";
import Header from "../../components/Header/Header";

export default function AddHabitPage({ currentUserId, users }) {
  const user = users.find((user) => {
    return user.id === currentUserId;
  });

  return (
    <>
      <Header user={user} />
      <AddHabit currentUserId={currentUserId} />
    </>
  );
}
