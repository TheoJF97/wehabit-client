export default function AddHabit() {
  return (
    <>
      <form className="addhabit">
        <h1 className="addhabit__header">AddHabit</h1>

        <div className="addhabit__inputs">
          <label htmlFor="Title" className="addhabit__label">
            Title
          </label>
          <input type="text" htmlFor="Title" className="addhabit__input" />
          <button className="addhabit__submit">Submit</button>
        </div>
      </form>
    </>
  );
}
