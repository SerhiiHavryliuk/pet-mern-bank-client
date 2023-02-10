import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    interest_rate: "",
    max_credit: "",
    min_payment: "",
    term_credit: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", interest_rate: "", max_credit: "", min_payment: "", term_credit: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Bank</h3>
      <form onSubmit={onSubmit}>

        {/* 1 Назва банку */}
        <div className="form-group">
          <label htmlFor="name">Назва банку</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        {/* 2 Макс сума кредиту */}
        <div className="form-group">
          <p> Процентна ставка %</p>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="10"
              checked={form.interest_rate === "10"}
              onChange={(e) => updateForm({ interest_rate: e.target.value })}
            />
            <label htmlFor="positionIntern" className="form-check-label">10</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="20"
              checked={form.interest_rate === "20"}
              onChange={(e) => updateForm({ interest_rate: e.target.value })}
            />
            <label htmlFor="positionJunior" className="form-check-label">20</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="30"
              checked={form.interest_rate === "30"}
              onChange={(e) => updateForm({ interest_rate: e.target.value })}
            />
            <label htmlFor="positionSenior" className="form-check-label">30</label>
          </div>
        </div>

        {/* 3 Процент % */}
        <div className="form-group">
          <label htmlFor="max_credit">Макс сума кредиту</label>
          <input
              type="text"
              className="form-control"
              id="max_credit"
              value={form.max_credit}
              onChange={(e) => updateForm({ max_credit: e.target.value })}
          />
        </div>

        {/* 4 Перший внесок */}
        <div className="form-group">
          <label htmlFor="min_payment">Перший внесок</label>
          <input
              type="text"
              className="form-control"
              id="min_payment"
              value={form.min_payment}
              onChange={(e) => updateForm({ min_payment: e.target.value })}
          />
        </div>

        {/* 5 Термін кредиту */}
        <div className="form-group">
          <label htmlFor="term_credit">Термін дії кредиту</label>
          <input
              type="text"
              className="form-control"
              id="term_credit"
              value={form.term_credit}
              onChange={(e) => updateForm({ term_credit: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create bank"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
