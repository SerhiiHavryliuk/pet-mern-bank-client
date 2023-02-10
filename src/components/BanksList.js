import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bank = (props) => (
  <tr>
    <td>{props.bank.name}</td>
    <td>{props.bank.interest_rate}</td>
    <td>{props.bank.max_credit}</td>
    <td>{props.bank.min_payment}</td>
    <td>{props.bank.term_credit}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.bank._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteBank(props.bank._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function BanksList() {
  const [banks, setBanks] = useState([]);

  // Development mode
  const serverUrlAPI = 'http://localhost:5000/';

  // Production mode
  // const serverUrlAPI = 'https://bank-server-lbi6.onrender.com/';

  // Data Base name
  const dbName = 'record';

  // This method fetches the records from the database.
  useEffect(() => {
    async function getBanks() {
      const response = await fetch(serverUrlAPI + dbName );

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const banks = await response.json();
      setBanks(banks);
    }

    getBanks();

    return; 
  }, [banks.length]);

  // This method will delete a record
  async function deleteBank(id) {
    await fetch(`${serverUrlAPI}${id}`, {
      method: "DELETE"
    });

    const newBank = banks.filter((el) => el._id !== id);
    setBanks(newBank);
  }

  // This method will map out the records on the table
  function banksList() {
    return banks.map((bank) => {
      return (
        <Bank
          bank={bank}
          deleteBank={() => deleteBank(bank._id)}
          key={bank._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>

      <h3>Banks List</h3>

      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
        <tr>
          <th>Назва</th>
          <th>Процент %</th>
          <th>Макс сума кредиту</th>
          <th>Перший внесок</th>
          <th>Термін кредиту</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>{banksList()}</tbody>
      </table>

    </div>
  );
}
