import React from 'react';
import './Settings.css';
import Checkbox from '../Checkbox/Checkbox';
// import Button from '../Button/Button';
import Input from '../Input/Input';


const PersonalData: React.FC = () => {
    return (
        <div className='Notifications'>
            <h2 className='Notifications__title'>Уведомления</h2>
            <div className='Notifications__line'></div>
            <div className='emailSettings'>
                <div className='emailSettings__title'>Настройки уведомлений и рассылки<br />
                    на e-mail</div>
                <form className='emailSettings__checkboxArea'>
                    <Checkbox>Изменения статусов заказов</Checkbox>
                    <Checkbox>Новости компании и новые фишки</Checkbox>
                    <Checkbox>Данные о финансах</Checkbox>
                    <Checkbox>Рекламные материалы партнеров</Checkbox>
                </form>
            </div>
            <div className='Notifications__line'></div>
            <div className='push'>
                <div className='push__title'>Уведомления в Телеграм и Push</div>
                <form className='push__checkboxArea'>
                    <Checkbox>Уведомления о статусах в Телеграм</Checkbox>
                    <Checkbox>Уведомления о финансах в Телеграм</Checkbox>
                    <Checkbox>Push-уведомления</Checkbox>
                </form>
            </div>
            <div className='Notifications__line'></div>
            <div className='linkUrAcc'>
                <div className='textArea'>
                    <div className='textArea__title'>Связать личные кабинеты (аккаунты)</div>
                    <div className='textArea__subTitle'>Введите идентификационный номер другого аккаунта <br />(например, #fe456)</div>
                </div>
                <div className='linkUrAcc__form'>
                    <Input />
                </div>
            </div>

        </div>
    );
};

export default PersonalData;

