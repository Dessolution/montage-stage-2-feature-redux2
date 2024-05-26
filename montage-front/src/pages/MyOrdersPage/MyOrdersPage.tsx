    import React, { useEffect } from 'react';
    import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
    import { AppRoute } from "../../utils/const";
    import './MyOrdersPage.css'


    const MyOrdersPage: React.FC = () => {
        const navigate = useNavigate();
        const {pathname} = useLocation();

        useEffect(() => {
            if (pathname === AppRoute.Main){
                navigate(AppRoute.OrdersCurrent)
            }
        }, [])

        return (
            <div className='MyOrders'>
                <h1 className='MyOrders__title'>Мои заказы</h1>
                <div className='MyOrders__nav'>
                    <NavLink to={AppRoute.OrdersCurrent}>Текущие</NavLink>
                    <NavLink to={AppRoute.FinishedOrders}> Завершенные</NavLink>
                    <NavLink to={AppRoute.OrdersStats}> Статистика</NavLink>

                    <NavLink to={AppRoute.StoreTest}> Store test</NavLink>

                </div>
                <Outlet />
            </div>
        )
    };

    export default MyOrdersPage;
