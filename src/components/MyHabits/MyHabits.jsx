export default function MyHabits() {
  function getCurrentWeekDates() {
    const today = new Date();
    const currentDay = today.getDay(); // Get the current day of the week (0-6, where 0 is Sunday)
    const firstDayOfWeek = new Date(today); // Create a new date object with the current date
    firstDayOfWeek.setDate(today.getDate() - currentDay); // Subtract the current day to get the first day of the week

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i); // Add the loop index to get each day of the week
      weekDates.push(date);
    }

    return weekDates;
  }

  const weekDates = getCurrentWeekDates();

  return (
    <>
      <section className="myhabits">
        <h1 className="myhabits__header">MyHabits - [username]</h1>
        <div className="myhabits__container">
          <div className="myhabits__dates">
            <h2 className="myhabits__title myhabits__title--empty">[habit1]</h2>
            {weekDates.map((date, index) => (
              <span key={index} className="myhabits__date">
                {date.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            ))}
          </div>

          <div className="myhabits__habit">
            <h2 className="myhabits__title">[habit1]</h2>
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
          </div>

          <div className="myhabits__habit">
            <h2 className="myhabits__title">[habit1]</h2>
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
          </div>

          <div className="myhabits__habit">
            <h2 className="myhabits__title">[habit1]</h2>
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
            <input type="checkbox" id="check" className="myhabits__check" />
          </div>
        </div>
      </section>
    </>
  );
}
