import Header from "../../components/Header/Header";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Habit from "../Habit/Habit";
// import { currentMonthYear, dates } from "../../utils/utils";
import { useParams } from "react-router-dom";
import TheirHabits from "../../components/TheirHabits/TheirHabits";
import EncourageMints from "../../components/EncourageMints/EncourageMints";
import SendEncourageMint from "../../components/SendEncourageMint/SendEncourageMint";

export default function TheirHabitsProfilePage({ currentUserId, users }) {
  // Grab id
  let { id } = useParams();

  console.log(typeof Number(id));
  console.log(typeof users[3].id);

  const user = users.find((user) => {
    return user.id === Number(id);
  });

  console.log(user);

  return (
    <>
      <Header />
      <TheirHabits user={user} currentUserId={currentUserId} />
      <SendEncourageMint currentUserId={currentUserId} />
      <EncourageMints />
    </>
  );
}
