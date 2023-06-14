export default function Header() {
  return (
    <>
      <header className="header">
        <h1 className="header__logo">WeHabit</h1>
        <nav className="header__navigation">
          <span className="header__link">MyHabits</span>
          <span className="header__link">WeHabits</span>
          <span className="header__link">Knowledge</span>
        </nav>
      </header>
    </>
  );
}
