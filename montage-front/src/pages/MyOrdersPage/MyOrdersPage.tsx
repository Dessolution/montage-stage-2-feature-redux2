import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppRoute } from "../../utils/const";
import './MyOrdersPage.css'
import InnerNavLink from '../../components/InnerNavLink/InnerNavLink';



const MyOrdersPage: React.FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === AppRoute.Main) {
            navigate(AppRoute.OrdersCurrent)
        }
    }, [])

    return (
        <div className='MyOrders'>
            <h1 className='MyOrders__title'>Мои заказы</h1>
            <div className='MyOrders__nav'>
                <NavLink to={AppRoute.OrdersCurrent}>
                    <InnerNavLink>
                        Текущие
                    </InnerNavLink>
                </NavLink>
                <NavLink to={AppRoute.FinishedOrders}>
                    <InnerNavLink>
                        Завершенные
                    </InnerNavLink>
                </NavLink>
                <NavLink to={AppRoute.OrdersStats}>
                    <InnerNavLink>
                        Статистика
                    </InnerNavLink>
                </NavLink>
            </div>


            <Outlet />
        </div>
    )
};

export default MyOrdersPage;
