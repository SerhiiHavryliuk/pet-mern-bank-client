import React from "react";
import {Link} from "react-router-dom";


class Bank extends React.Component{

    render() {
        // Деструктуризація значень які приходять у пропсі
        const { _id, name, interest_rate, max_credit, min_payment, term_credit } = this.props.bank;

        return(
            <tr>
                <td>{name}</td>
                <td>{interest_rate}</td>
                <td>{max_credit}</td>
                <td>{min_payment}</td>
                <td>{term_credit}</td>
                <td>
                    <Link className="btn btn-link" to={`/edit/${_id}`}>Edit</Link> |
                    <button className="btn btn-link"
                            onClick={() => {
                                this.props.deleteBank(_id);
                            }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}

export default Bank;