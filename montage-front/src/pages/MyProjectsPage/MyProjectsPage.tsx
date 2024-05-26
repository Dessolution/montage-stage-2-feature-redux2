import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import './MyProjectsPage.css';
import InnerNavLink from '../../components/InnerNavLink/InnerNavLink';

const MyProjectsPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(AppRoute.ProjectsLinked)
    }, [])

    return (
        <div className='MyProjectsPage'>
            <h1 className='MyProjectsPage__title'>Мои проекты</h1>
            <div className='MyProjectsPage__nav'>
                <NavLink to={AppRoute.ProjectsLinked}>
                    <InnerNavLink>Подключенные проекты</InnerNavLink>
                </NavLink>
                <NavLink to={AppRoute.ProjectsStats}>
                    <InnerNavLink>Статистика</InnerNavLink>
                </NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default MyProjectsPage;
