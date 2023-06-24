import { Link } from "react-router-dom";
import logo from "../../assets/logo/wehabit-logo.png";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link to="/" className="header__home">
          <img src={logo} alt="WeHabit Logo" className="header__logo" />
        </Link>
        <nav className="header__navigation">
          <Link to="/1">
            <h3 className="header__link">MyHabits</h3>
          </Link>
          <Link to="/theirhabits">
            <h3 className="header__link">TheirHabits</h3>
          </Link>
          <h3 className="header__link">Knowledge</h3>
        </nav>
      </header>
    </>
  );
}
