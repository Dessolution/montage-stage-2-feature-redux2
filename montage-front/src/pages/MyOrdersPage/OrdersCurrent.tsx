import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { AppRoute } from "../../utils/const";

const OrdersCurrent: React.FC = () => {
    return (
        <div className='CurrentOrders'>
            <h2>CurrentOrders</h2>
            <Link to={AppRoute.Chat}><button>Chat</button></Link>
            <Outlet />
        </div>
    )
};

export default OrdersCurrent;