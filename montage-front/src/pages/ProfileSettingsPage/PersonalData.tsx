import React from 'react'
import './PersonalData.css';
import Input from '..//..//components/Input/Input';
import Button from '../../components/Button/Button';

const PersonalData: React.FC = () => {
    return (
        <div className='PersonalData'>
            <div className='aboutMe'>
                <div className='aboutMe__header'>
                    <h2 className='aboutMe__title'>Обо мне</h2>
                    <div className='userID'>Ваш id: __</div>
                </div>
                <div className='aboutMe__line'></div>
                <form className='aboutMe__form form'>
                    <div className='userName flex'>
                        <div className='userName__text'>
                            <p className='userName__title title'>Имя</p>
                            <p className='userName__subTitle subTitle'>Или укажите ФИО полностью</p>
                        </div>
                        <Input></Input>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='userEmail flex'>
                        <div className='userEmail__text text'>
                            <p className='userEmail__title title'>Ваш e-mail</p>
                        </div>
                        <Input></Input>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='userNumber flex'>
                        <div className='userNumber__text text'>
                            <p className='userNumber__title title'>Номер телефона</p>
                        </div>
                        <Input></Input>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='uploadPhoto'>
                        <div className='uploadPhoto__text'>
                            <p className='uploadPhoto__title title'>Загрузите фото</p>
                            <p className='uploadPhoto__subTitle subTitle'>Это будет отображаться в вашем профиле</p>
                        </div>
                        <div className='content'>
                            <div className='content__image'></div>
                            <div className='content__buttons'>
                                <Button className='btn__del content__btn'>Удалить</Button>
                                <Button className='btn__change content__btn'>Заменить</Button>
                            </div>
                        </div>
                    </div>
                    <div className='aboutMe__line'></div>
                </form>
            </div>
        </div >
    )
}

export default PersonalData;