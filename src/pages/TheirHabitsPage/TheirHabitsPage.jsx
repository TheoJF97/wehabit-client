import Header from "../../components/Header/Header";
import TheirHabits from "../../components/TheirHabits/TheirHabits";

export default function TheirHabitsPage({ currentUserId, users }) {
  const filteredUsers = users.filter((user) => {
    return user.id !== currentUserId;
  });

  return (
    <>
      <Header />
      {filteredUsers.map((user, userId) => {
        return (
          <TheirHabits user={user} key={userId} currentUserId={currentUserId} />
        );
      })}
    </>
  );
}
