import React, { useEffect } from 'react';
import './NewOrder.css'
import {  Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, OrderStepsRoute } from '../../utils/const';

const NewOrder: React.FC = () => {
    const navigate = useNavigate();
    const {pathname} =useLocation();
    useEffect(() => {
        if (pathname === AppRoute.NewOrder){
            navigate(OrderStepsRoute.TaskStep)
        }
    }, [])
    return (
        <div className="NewOrder_body">
            <div className='Order__container'>
                <Outlet/>
            </div>
        </div>
    )
};

export default NewOrder;
