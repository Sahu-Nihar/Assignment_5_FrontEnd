import React from 'react';
import { Route } from 'react-router-dom';
import CustomerById from './pages/CustomerById';
import Customers from './pages/Customers';
import OrdersList from './pages/OrdersList';
import OrderById from './pages/OrderById';
import Home from './pages/Home';

const App = () => {
    return (
        <div>
            <Route path='/' exact component={Home}/>
            <Route path='/customers' exact component={Customers}/>
            <Route path='/customers/:custId' exact component={CustomerById}/>
            <Route path='/customers/:custId/orders' exact component={OrdersList} />
            <Route path='/customers/:cId/orders/:oId' component={OrderById} />
        </div>
    )
}

export default App;