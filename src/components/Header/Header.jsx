import { Link } from "react-router-dom";
import logo from "../../assets/logo/wehabit-logo.png";

export default function Header({ currentUser }) {
  const id = currentUser.id;

  // console.log(currentUser);
  // console.log(id);

  return (
    <>
      <header className="header">
        <Link to={`/${id}`} className="header__home">
          <img src={logo} alt="WeHabit Logo" className="header__logo" />
        </Link>
        <nav className="header__navigation">
          <Link to={`/${id}`} className="header__link">
            <h3 className="header__link-name">MyHabits</h3>
          </Link>
          <Link to="/theirhabits" className="header__link">
            <h3 className="header__link-name">TheirHabits</h3>
          </Link>
        </nav>
      </header>
    </>
  );
}
