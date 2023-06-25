import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import TheirHabits from "../../components/TheirHabits/TheirHabits";
import EncourageMints from "../../components/EncourageMints/EncourageMints";
import SendEncourageMint from "../../components/SendEncourageMint/SendEncourageMint";

export default function TheirHabitsProfilePage({ currentUserId, users }) {
  // Grab id
  let { id } = useParams();

  const currentUser = users.find((user) => {
    return user.id === currentUserId;
  });

  console.log(currentUser);

  const user = users.find((user) => {
    return user.id === Number(id);
  });

  console.log(user);

  return (
    <>
      <Header currentUser={currentUser} />
      <TheirHabits user={user} currentUserId={currentUserId} />
      <SendEncourageMint currentUserId={currentUserId} />
      <EncourageMints />
    </>
  );
}
