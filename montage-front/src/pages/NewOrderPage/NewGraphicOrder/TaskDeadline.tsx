import React from 'react'
import Button from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { OrderStepsRoute } from '../../../utils/const';
import Input from '../../../components/Input/Input';
import { ProgressBarDeadlineStep } from '../../../components/ProgressBar/ProgressBarGraphic/ProgressBarDeadlineStep';

const TaskDeadline: React.FC = () => {
  return (
    <>
      <div className='Header__newOrder'>Сроки</div>
      <ProgressBarDeadlineStep />
      <div className='Deadline__container'>
        <h1 className='Description__task'>Дедлайн проекта</h1>
        <div className='Date__picker'><Input /></div>
      </div>

      <div className='task__buttons'>
        <Link to={OrderStepsRoute.TechnicalTaskStep}>
          <Button type='button' className='Btn__back'>Назад</Button>
        </Link>

        <Link to={OrderStepsRoute.SpecialistLevelStep}>
          <Button type='button' className='Btn__continue'>Продолжить</Button>
        </Link>
      </div>
    </>
  )
}

export default TaskDeadline;