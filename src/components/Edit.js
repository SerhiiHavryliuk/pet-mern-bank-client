import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { serverUrlAPI } from '../settings/settings';
import {dbName} from "../settings/settings" // Data Base name

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    interest_rate: "",
    max_credit: "",
    min_payment: "",
    term_credit: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`${serverUrlAPI}/${dbName}/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const bank = await response.json();
      if (!bank) {
        window.alert(`Bank with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(bank);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      interest_rate: form.interest_rate,
      max_credit: form.max_credit,
      min_payment: form.min_payment,
      term_credit: form.term_credit,
    };

    // This will send a post request to update the data in the database.
    await fetch(`${serverUrlAPI}/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Edit Bank</h3>
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
              type="number"
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
              type="number"
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
              type="number"
              className="form-control"
              id="term_credit"
              value={form.term_credit}
              onChange={(e) => updateForm({ term_credit: e.target.value })}
          />
        </div>

        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Edit Bank"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
