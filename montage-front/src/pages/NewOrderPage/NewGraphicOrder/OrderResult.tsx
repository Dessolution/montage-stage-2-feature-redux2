import React from 'react'
import { OrderStepsRoute } from '../../../utils/const';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { ProgressBarResultStep } from '../../../components/ProgressBar/ProgressBarGraphic/ProgressBarResultStep';

const OrderResult:React.FC = () => {
  return (
    <>
        <ProgressBarResultStep/>
        <div className='Header__newOrder'>order result</div>

        

        <div className='task__buttons'>
          <Link to={OrderStepsRoute.SpecialistLevelStep}>
            <Button type='button' className='Btn__back'>Назад</Button>
          </Link>

          <Link to={OrderStepsRoute.OrderSuccessStep}>
            <Button type='button' className='Btn__continue'>Продолжить</Button>
          </Link>
        </div>
    </>
  )
}

export default OrderResult;