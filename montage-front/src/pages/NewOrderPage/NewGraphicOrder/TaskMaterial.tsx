import React from 'react'
import { Link } from 'react-router-dom'
import { OrderStepsRoute } from '../../../utils/const'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import '../NewOrder.css'
import Checkbox from '../../../components/Checkbox/Checkbox'
import { ProgressBarMaterialStep } from '../../../components/ProgressBar/ProgressBarGraphic/ProgressBarMaterialStep'

const TaskMaterial: React.FC = () => {
  return (
    <>
      <ProgressBarMaterialStep />

      <div className='Header__newOrder'>Материал</div>
      <div className='Link__accounts'>
        <div className='LinkAcc__text'>Ссылка на канал/сообщество</div>
        <div className='Acc__input'><Input /></div>
        <div className='No__accounts'><Checkbox>Нет канала</Checkbox></div>
      </div>


      <div className='task__buttons'>
        <Link to={OrderStepsRoute.SubTaskStep}>
          <Button type='button' className='Btn__back'>Назад</Button>
        </Link>

        <Link to={OrderStepsRoute.TechnicalTaskStep}>
          <Button type='button' className='Btn__continue'>Продолжить</Button>
        </Link>
      </div>
    </>
  )
}

export default TaskMaterial;