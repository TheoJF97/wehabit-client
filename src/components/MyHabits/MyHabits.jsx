export default function MyHabits() {
  return (
    <>
      <section className="myhabits">
        <h1 className="myhabits__header">MyHabits - [username]</h1>
        <div className="myhabits__container">
          <div className="myhabits__dates">
            <h2 className="myhabits__title myhabits__title--empty">[habit1]</h2>
            <span className="myhabits__date">Sun, Jun 25</span>
            <span className="myhabits__date">Mon, Jun 26</span>
            <span className="myhabits__date">Tue, Jun 27</span>
            <span className="myhabits__date">Wed, Jun 28</span>
            <span className="myhabits__date">Thu, Jun 29</span>
            <span className="myhabits__date">Fri, Jun 30</span>
            <span className="myhabits__date">Sat, Jul 1</span>
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
