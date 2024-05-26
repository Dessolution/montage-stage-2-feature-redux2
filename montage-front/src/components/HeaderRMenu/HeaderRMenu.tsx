import React from 'react'
import './HeaderRMenu.css'
import Button from '../Button/Button'
import Wallet from './Wallet'
import DropdownArrow from './DropdownArrow'
import Bell from './Bell'
import EmailIcon from './EmailIcon'
import ThemeIcon from './ThemeIcon'
import { Link } from 'react-router-dom'
import { OrderStepsRoute } from '../../utils/const'
import WhiteStripe from '../../assets/images/WhiteStripe'


const HeaderRMenu: React.FC = () => {
    return (
        <div className='HeaderRMenu'>
            <div className='Language__field'>
                <h1>Eng</h1>

            </div>
            <div className='Themes'><ThemeIcon /></div>

            <div className='RightMenu__container'>
                <div className='UserHeader__menu'>
                    <div className='Wallet__menu'>
                        <div className='Wallet'>
                            <Wallet />
                        </div>
                        <div className='Sum'>127000 Р</div>
                        <div className='Arrow'><DropdownArrow /></div>
                    </div>
                    <div className='UserShort__info'>
                        <div className='Bell'><Bell /></div>
                        <div className='EmailIcon'><EmailIcon /></div>

                        <div className='Photo__field'></div>
                        <div className='User__text'>Алексей К.</div>
                    </div>

                </div>

                <div className='Button__field'>
                    <Link to={OrderStepsRoute.TaskStep}>
                        <Button as='button' type='button' className='Create__order'>Создать заказ <WhiteStripe /> </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HeaderRMenu