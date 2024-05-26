import React from 'react'
import './PersonalData.css';
import Input from '..//..//components/Input/Input';
import Button from '../../components/Button/Button';
import '..//..//components/Input/input.css';
import VKIcon from '../../assets/images/VKIcon';
import ViberIcon from '../../assets/images/ViberIcon';
import TGIcon from '../../assets/images/TGIcon';
import WhatsAppIcon from '../../assets/images/WhatsAppIcon';
import OtherProjectsArrow from '../../assets/images/OtherProjectsArrow';
import PasswordSwitch from '../../assets/images/PasswordSwitch';

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
                        <div className='Input__container'><Input className='Input' placeholderText='ФИО' /></div>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='userEmail flex'>
                        <div className='userEmail__text text'>
                            <p className='userEmail__title title'>Ваш e-mail</p>
                        </div>
                        <div className='Input__container'><Input className='Input' placeholderText='E-mail' /></div>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='userNumber flex'>
                        <div className='userNumber__text text'>
                            <p className='userNumber__title title'>Номер телефона</p>
                        </div>
                        <div className='Input__container userNumber__input'><Input type='tel' className='Input' placeholderText='+7 (___) ___-__-__' /></div>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='uploadPhoto flex'>
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
                    <div className='messengers flex'>
                        <p className='messengers__title title'>Мессенджеры</p>
                        <div className='links'>
                            <Button className='links__vk link' ><VKIcon />Вконтакте</Button>
                            <Button className='links__viber link'><ViberIcon />Viber</Button>
                            <Button className='links__whatsapp link'><WhatsAppIcon />WhatsApp</Button>
                            <Button className='links__tg link'><TGIcon />Telegram</Button>
                        </div>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='aboutInfo flex'>
                        <div className='aboutInfo__text text'>
                            <p className='aboutInfo__title title'>Информация о вас</p>
                            <p className='aboutInfo__subTitle subTitle'>Напишите краткое введение</p>
                        </div>
                        <div className='inputArea'>
                            <textarea maxLength={500} placeholder='Расскажите о вас'></textarea>
                            <p className='inputArea__inputUnderText'>не более 500 символов</p>
                        </div>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='passwordChange flex'>
                        <p className='passwordChange__title title'>Сменить пароль</p>
                        <div className='PasswordChange__inputs'>
                            <div className='PasswordChange__input1'>
                                <Input type='password' placeholderText='Новый пароль' className='Input'></Input>
                                <button className='PasswordChange__SwitchBtn'><PasswordSwitch /></button>
                            </div>
                            <div className='PasswordChange__input2'>
                                <Input type='password' placeholderText='Повторите пароль' className='Input'></Input>
                                <button className='PasswordChange__SwitchBtn'><PasswordSwitch /></button>
                            </div>

                        </div>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='mainProject flex'>
                        <p className='mainProject__title title'>Основной проект</p>
                        <div className='mainProject__card'>
                            <div className='mainProject__content'>your main project will be here soon!</div>
                            <Button className='mainProject__otherProjects'>Перейти ко всем проектам <OtherProjectsArrow /></Button>
                        </div>
                    </div>
                    <h3 className='aboutCompany__title'>О компании</h3>
                    <div className='aboutMe__line'></div>
                    <div className='companyName flex'>
                        <p className='companyName__title title'>Название компании</p>
                        <div className='Input__container'><Input placeholderText='Название' className='Input' /></div>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='positionActivity flex'>
                        <p className='positionActivity__title title'>Ваша деятельность в должности</p>
                        <div className='Input__container'><Input placeholderText='Название должности' className='Input' /></div>
                    </div>
                    <div className='aboutMe__line'></div>
                    <div className='companySite flex'>
                        <p className='companySite__title title'>Сайт компании</p>
                        <div className='companySite__container'><Input className='companySite__input' placeholderText='Сайт компании' /></div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default PersonalData;