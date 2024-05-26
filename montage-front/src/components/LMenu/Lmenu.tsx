import { Link, useLocation } from 'react-router-dom'
import cn from "classnames";
import Feature from '../../assets/images/Feature'
import Button from '../Button/Button'
import './Lmenu.css'
import { AppRoute } from '../../utils/const'
import { getButtonClassName } from '../../utils/getButtonClassName';


const Lmenu: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="Lmenu">
      <div className='Main_buttons'>
        <Link to={AppRoute.OrdersCurrent}>
          <Button
            as="button"
            type='button'
            className={cn('My_orders',
              `${(getButtonClassName(pathname, [AppRoute.OrdersCurrent, AppRoute.FinishedOrders, AppRoute.OrdersStats]))}`)}>
            Мои заказы
          </Button>
        </Link>
        <Link to={AppRoute.ProjectsLinked}>
          <Button
            as="button"
            className={cn('My_projects',
              `${(getButtonClassName(pathname, [AppRoute.Projects, AppRoute.ProjectsLinked, AppRoute.ProjectsStats]))}`)}>
            Мои проекты
          </Button>
        </Link>
        <Link to={AppRoute.PersonalData}>
          <Button
            as="button"
            className={cn('Profile_settings',
              `${(getButtonClassName(pathname, [AppRoute.Profile, AppRoute.PersonalData, AppRoute.Settings, AppRoute.Finance, AppRoute.Tariff]))}`)}>
            Настройки профиля
          </Button>
        </Link>
      </div>

      <Feature />
      <div className='Feature'>
        <p>Ежемесячная покупка скидки 20% на все виды работ</p>
        <Button as="button" className='change_tariff'> Сменить тариф</Button>
      </div>

      <Button as="button" className='Exit_btn'>Выйти из аккаунта</Button>
    </div>
  )
}

export default Lmenu