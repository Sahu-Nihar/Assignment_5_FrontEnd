import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RenderError from './RenderError';

const CustomerById = () => {
    const { custId } = useParams();
    const [state, setState] = useState(0);
    const [data, setData] = useState({});
    const [customerId, setCustomerId] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const displaySelectedCustomer = (id) => axios({
        method: 'get',
        url: `http://localhost:8080/api/v1/customers/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        validateStatus: false
    });

    const functionToGetCustomerDetails = (ID) => {
        displaySelectedCustomer(ID)
            .then(response => {
                let data = response.data;
                console.log("Data received:", data);

                if (data.success) {
                    setState(1);
                    setData(data.data);
                    setCustomerId(data.data.customer_id)
                }
                else {
                    setState(2);
                    setErrorMsg(data.message);
                }
            })
    }

    const renderData = () => {
        return (
            <div>
                <table cellPadding="5">
                    <tr>
                        <td colSpan="10" style={{ justifyContent: "center", textAlign: 'center' }}>
                            Details of customer with ID: {customerId}
                        </td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                    </tr>
                    <tbody>
                        <td>{data.firstName} </td>
                        <td>{data.lastName}</td>
                        <td>{data.phoneNumber}</td>
                        <td>{data.emailAddress}</td>
                    </tbody>
                </table>
            </div>
        )
    }

    useEffect(() => {
        functionToGetCustomerDetails(custId);
    },[])

    return (
        state === 1 ? (renderData()) : (<RenderError errorMsg={errorMsg}/>)
    )
};

export default CustomerById;
