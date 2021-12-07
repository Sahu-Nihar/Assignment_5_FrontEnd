import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RenderError from './RenderError';

const Customers = () => {
    const [state, setState] = useState(0);
    const [data, setData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const displayAllCustomers = () => axios({
        method: 'get',
        url: 'http://localhost:8080/api/v1/customers',
        headers: {
            'Content-Type': 'application/json'
        },
        validateStatus: false
    });

    const functionToGetCustomerDetails = () => {
        displayAllCustomers()
            .then(response => {
                let data = response.data;
                console.log("Data received:", data);

                if (data.success) {
                    setState(1);
                    setData(data.data);
                }
                else {
                    setState(2);
                    setErrorMsg(data.message);
                }
            })
    }

    const buildTable = (arr) => {
        const rows = arr.map((row) => {
            return (
                <tr key={parseInt(row.customer_id)} style={{ backgroundColor: parseInt(row.customer_id) % 2 ? '#F0FFF2' : 'white' }}>
                    <td>{row.firstName} </td>
                    <td>{row.lastName}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.emailAddress}</td>
                </tr>
            )
        })

        return (
            <table cellPadding="5" cellSpacing="5">
                <tr>
                    <td colSpan="10" style={{ justifyContent: "center", textAlign: 'center' }}>Customers List</td>
                </tr>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email Address</th>
                </tr>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

    useEffect(() => {
        functionToGetCustomerDetails();
    }, [])

    return (
        <div>
            {state === 1 ? buildTable(data) : <RenderError errorMsg={errorMsg} />}
        </div>
    )
}

export default Customers;