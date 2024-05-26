import React from 'react'
import { OrderStepsRoute } from '../../../utils/const';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import Radio from '../../../components/Radio/Radio';
import { ProgressBarSprcialistStep } from '../../../components/ProgressBar/ProgressBarGraphic/ProgressBarSpecialistStep';

const SpecialistLevel: React.FC = () => {
  return (
    <>
      <ProgressBarSprcialistStep />
      <div className='Header__newOrder'>Настройки специалиста</div>

      <div className='Specialist__container'>
        <h1 className='Description__task'>Опыт</h1>
        <div className='Exp__task'>Дополнительный текст который заложен в иконку вопросика</div>
      </div>

      <div className='Choose__task'>
        <div className="task_field">
          <Radio>Начинающий</Radio>
        </div>
        <div className="task_field">
          <Radio>Средний уровень</Radio>
        </div>
        <div className="task_field">
          <Radio>Профессионал</Radio>
        </div>

      </div>

      <div className='task__buttons'>
        <Link to={OrderStepsRoute.DeadlineStep}>
          <Button type='button' className='Btn__back'>Назад</Button>
        </Link>

        <Link to={OrderStepsRoute.OrderResultStep}>
          <Button type='button' className='Btn__continue'>Продолжить</Button>
        </Link>
      </div>
    </>
  )
}

export default SpecialistLevel;