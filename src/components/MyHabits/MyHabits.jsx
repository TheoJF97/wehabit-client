export default function MyHabits() {
  return (
    <>
      <section className="myhabits">
        <h1 className="myhabits__title">MyHabits</h1>
        {/* <div className="myhabits__check-container">
          <label htmlFor="check">Checkbox</label>
          <input type="checkbox" id="check" className="myhabits__check" />
        </div> */}
        <div className="wrapper">
          <label>Drink Water</label>
          <input type="checkbox" id="check" className="myhabits__check" />
          <input type="checkbox" id="check" className="myhabits__check" />
          <input type="checkbox" id="check" className="myhabits__check" />
          <input type="checkbox" id="check" className="myhabits__check" />
          <input type="checkbox" id="check" className="myhabits__check" />
          <input type="checkbox" id="check" className="myhabits__check" />
        </div>
      </section>
    </>
  );
}
