import React from 'react'
import { Link } from 'react-router-dom';
import { AppRoute, OrderStepsRoute } from '../../../utils/const';
import Button from '../../../components/Button/Button';

const OrderSuccess: React.FC = () => {
  return (
    <>
      <div className='Header__newOrder'>Ваш заказ успешно размещен</div>

      <div className='task__buttons'>
        <Link to={OrderStepsRoute.OrderResultStep}>
          <Button type='button' className='Btn__back'>Назад</Button>
        </Link>

        <Link to={AppRoute.OrdersCurrent}>
          <Button type='button' className='Btn__continue'>Продолжить</Button>
        </Link>
      </div>

    </>
  )
}
export default OrderSuccess;