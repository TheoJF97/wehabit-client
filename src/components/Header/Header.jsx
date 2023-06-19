import { Link } from "react-router-dom";
import logo from "../../assets/logo/wehabit-logo.png";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link to="/" className="header__home">
        <img src={logo} alt="WeHabit Logo" className="header__logo" />
          {/* <h1 className="header__logo">WeHabit</h1> */}
        </Link>
        <nav className="header__navigation">
          <span className="header__link">MyHabits</span>
          <span className="header__link">WeHabits</span>
          <span className="header__link">Knowledge</span>
        </nav>
      </header>
    </>
  );
}
