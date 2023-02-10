import React from "react";
import { serverUrlAPI } from '../settings/settings';
import Bank from './Bank'
import {dbName} from "../settings/settings" // Data Base name

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import "./style.css"

class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataBanks: [],     // зберігаємо масив усіх банки з бд
            selectedBank:'',   // збергігаємо назву поточного банку
            initial_loan: 0,   // сума кредиту
            down_payment: 0,   // сума першого платежу
            total_months: 0,   // срок кредиту
            month_payment: 0   // місячний платіж по кредиту
        }
    }

    //-----------------------------------------------------------------------------------
    // Функція виконується коли компонент додається у DOM
    //-----------------------------------------------------------------------------------
    async componentDidMount() {
        // Отримуємо списк всіх банків із бд
        await this.getBanks();

        // Встановлюємо перший банк у списку у state та виводимо для користувача
        this.setSelectedBank(this.state.dataBanks[0]);
    }

    //-----------------------------------------------------------------------------------
    // Функція яка оновлює дані вибраного банка у табличці
    //-----------------------------------------------------------------------------------
    changeBank = (e) =>{
        // Зчитуємо назву банку з select
        const selectedBankName = e.target.value;

        // Знаходимо банк за назвою
        // !!! тут уважно так як filter повертає масив, а нам треба передати обєкт
        const selectedBank = this.getBankByName(selectedBankName);
        this.setSelectedBank(selectedBank[0]);
    }

    //-----------------------------------------------------------------------------------
    // Функція для отримання банку по назві
    //-----------------------------------------------------------------------------------
    getBankByName = (bankName) =>{
        return this.state.dataBanks.filter((bank) => bank.name === bankName);
    }

    //-----------------------------------------------------------------------------------
    // функція для встановлення у state вибраного банку
    //-----------------------------------------------------------------------------------
    setSelectedBank = (bank) =>{
        this.setState(({selectedBank}) => {
            return {
                selectedBank: bank
            }
        })
    }

    //-----------------------------------------------------------------------------------
    // Функція викликається коли компонент оновлюється у бд
    //-----------------------------------------------------------------------------------
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Компонент List оновлюється в DOM');
    }

    //-----------------------------------------------------------------------------------
    // Функція для отримання списку банків із бд
    //-----------------------------------------------------------------------------------
    async getBanks() {
        // 1) Робимо гет запит, отримуємо всі банки
        const response = await fetch(serverUrlAPI +'/' + dbName);

        // якщо дані не отримали з бд то показуємо повідомлення
        if (!response.ok) {
            const message = `An error occured: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const banks = await response.json();

        // 2) записуємо у змінну стейт всі банки
        this.setState(({dataBanks}) => {
            return {
                dataBanks: banks
            }
        })
    }

    //-----------------------------------------------------------------------------------
    // Функція викликається при зміні значення у полі input
    // і перезаписує введене значення у відповідний state (назва state відповідає назві id input)
    //-----------------------------------------------------------------------------------
    updateForm = (e) => {
        const { id, value } = e.target;

        this.setState(({dataBanks}) => {
            return {
                [id]: value
            }
        })
    }

    //-----------------------------------------------------------------------------------
    // Функція яка рахує місячний платіж
    //-----------------------------------------------------------------------------------
    onSubmit = (e) => {
        // відміняємо дію форми, щоб не оновлювалась сторінка
        e.preventDefault();

        // отримуємо значення які ввів користувач у поля input
        const userInitialLoan = parseInt(this.state.initial_loan, 10);
        const userDownPayment = parseInt(this.state.down_payment, 10);
        const userTotalMouns = parseInt(this.state.total_months, 10);

        // зчитуємо значення з вибраного банака у select
        const interestRate = parseInt(this.state.selectedBank.interest_rate, 10);

        // ці значення треба для валідності (перевірки) даних
        // todo: валідацію треба доробити
        const maximumLoan = parseInt(this.state.selectedBank.max_credit, 10);
        const minimumDownPayment = parseInt(this.state.selectedBank.min_payment, 10);
        const loanTerm = parseInt(this.state.selectedBank.term_credit, 10);

        // робимо розрахунок по формулі
        const resultMounthlyPayment = ((userInitialLoan-userDownPayment) * (interestRate / 1200) * Math.pow(1 + interestRate / 1200, userTotalMouns)) / (Math.pow(1 + interestRate / 1200, userTotalMouns) - 1);

        // записуємо результат у state та виводимо на єкран
        this.setState(() => {
            return {
                month_payment: Math.floor(resultMounthlyPayment)
            }
        })
    }


    render() {
        // деструкиуризація state
        const {dataBanks, selectedBank, month_payment } = this.state;
        
        // Анонімна функція в якій формується список банків для селекта
        const listBanks = dataBanks.map((bank) =>
            <option key={bank._id}>{bank.name}</option>
        );

        return (
            <div>
                <h3> Page calculator </h3>

                <form onSubmit={this.onSubmit}>
                    <select className="form-select calcSelect" aria-label="Default select example" onChange={this.changeBank}>
                        {listBanks}
                    </select>

                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Назва</th>
                                <th>Процент %</th>
                                <th>Макс сума кредиту</th>
                                <th>Перший внесок</th>
                                <th>Термін кредиту</th>
                                <th> Дії </th>
                            </tr>
                        </thead>
                        <tbody>
                            {<Bank bank={selectedBank}/>}
                        </tbody>
                    </table>

                    <div className='userData'>
                        <div className="form-group">
                            <label htmlFor="initial_loan">Сума кредиту</label>
                            <input
                                type="number"
                                className="form-control"
                                id="initial_loan"
                                value={this.state.initial_loan}
                                onChange={(e) => this.updateForm(e)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="down_payment">Перший платіж</label>
                            <input
                                type="number"
                                className="form-control"
                                id="down_payment"
                                value={this.state.down_payment}
                                onChange={(e) => this.updateForm(e)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="total_months">Кількість місяців</label>
                            <input
                                type="number"
                                className="form-control"
                                id="total_months"
                                value={this.state.total_months}
                                onChange={(e) => this.updateForm(e)}
                            />
                        </div>

                        <div className="form-group btnCalc">
                            <span>Місячний платіж: {month_payment} </span>
                            <input
                                type="submit"
                                value="Calculate"
                                className="btn btn-primary"
                            />
                        </div>

                    </div>

                </form>
            </div>
        );
    }
}

export default Calculator;
