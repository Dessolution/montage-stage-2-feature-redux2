import React, { useEffect } from 'react';
import './ProfileSettingsPage.css';
import Button from '../../components/Button/Button';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import InnerNavLink from '../../components/InnerNavLink/InnerNavLink';

const ProfileSettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const {pathname} =useLocation();

    useEffect(() => {
        if (pathname === AppRoute.Profile){
            navigate(AppRoute.PersonalData)

        }
    }, [])
    return (
        <div>
            <div className='ProfileSettings'>
                <h1 className='ProfileSettings__title'>Настройки профиля</h1>
                <div className='ProfileSettings__nav'>
                    <NavLink to={AppRoute.PersonalData}>
                        <InnerNavLink>Личные данные</InnerNavLink>
                    </NavLink>
                    <NavLink to={AppRoute.Settings}>
                        <InnerNavLink >Настройки</InnerNavLink>
                    </NavLink>
                    <NavLink to={AppRoute.Finance}>
                        <InnerNavLink >Финансы</InnerNavLink>
                    </NavLink>
                    <NavLink to={AppRoute.Tariff}>
                        <InnerNavLink >Тарифы</InnerNavLink>
                    </NavLink>
                </div>
                <Outlet />
                <div className='Confirms'>
                    
                    <Button as="button" type='button' className='Cancel'> Отменить </Button>
                    <Button as="button" type='button' className='Confirm'>  Сохранить </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettingsPage;
