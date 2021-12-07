import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RenderError from './RenderError';

const OrdersList = () => {
    const [state, setState] = useState(0);
    const { custId } = useParams();
    const [data, setData] = useState([]);
    const [customerId, setCustomerId] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const displayOrderList = (id) => axios({
        method: 'get',
        url: `http://localhost:8080/api/v1/customers/${id}/orders`,
        headers: {
            'Content-Type': 'application/json'
        },
        validateStatus: false
    });

    const functionToGetOrderList = (ID) => {
        displayOrderList(ID)
            .then(response => {
                let data = response.data;
                console.log("Data received:", data);

                if (data.success) {
                    setState(1);
                    setData(data.data);
                    setCustomerId(custId)
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
                <tr key={parseInt(row.order_id)} style={{ backgroundColor: parseInt(row.order_id) % 2 ? '#F0FFF2' : 'white' }}>
                    <td>{row.product_name} </td>
                    <td>{row.category}</td>
                    <td>{row.product}</td>
                    <td>{row.cost}</td>
                    <td>{row.place}</td>
                    <td>{row.shipment === true ? "Yes" : "No"}</td>
                    <td>{row.purchase_date}</td>
                    <td>{row.delivery_date}</td>
                    <td>{row.delivery_status === true ? "Delivered" : "Not Delivered"}</td>
                </tr>
            )
        })

        return (
            <table cellPadding="5" cellSpacing="5">
                <tr>
                    <td colSpan="10" style={{ justifyContent: "center", textAlign: 'center' }}>Orders list of customer with ID: {customerId}</td>
                </tr>
                <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Product</th>
                    <th>Product Cost</th>
                    <th>Place of delivery</th>
                    <th>Product Shipped</th>
                    <th>Purchase Date</th>
                    <th>Delivery Date</th>
                    <th>Delivery Status</th>
                </tr>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

    useEffect(() => {
        functionToGetOrderList(custId);
    }, [])

    return (
        <div>
            {state === 1 ? buildTable(data) : <RenderError errorMsg={errorMsg} />}
        </div>
    )
}

export default OrdersList;
