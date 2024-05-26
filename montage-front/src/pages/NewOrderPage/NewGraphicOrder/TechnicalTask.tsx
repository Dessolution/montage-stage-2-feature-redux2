import React from 'react'
import { OrderStepsRoute } from '../../../utils/const';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import TechTaskNav from '../../../components/TechTaskNav/TechTaskNav';
import TextArea from '../../../components/TextArea/TextArea';
import Input from '../../../components/Input/Input';
import Checkbox from '../../../components/Checkbox/Checkbox';
import ProgressBarTechTaskStep from '../../../components/ProgressBar/ProgressBarGraphic/ProgressBarTechTaskStep';

const TechnicalTask: React.FC = () => {
  return (
    <>
      <ProgressBarTechTaskStep />
      <div className='Header__newOrder'>Техническое задание</div>

      <TechTaskNav />

      <div className='Task__body'>

        <div className='Description__Container'>
          <h1 className='Description__task'>Опишите, что хотели бы видеть в шапке канала</h1>
          <div className='Description__area'>
            <TextArea />
          </div>
        </div>


        <div className='Reference__container'>
          <h1 className='Link__reference'>Ссылка на референсы</h1>
          <div className='Reference__input'><Input /></div>
        </div>

        <div className='Platform__container'>
          <h1 className='Platform__reference'>Платформа</h1>
          <div className='Platform__checkboxes'>
            <div className='Platform__fields'><Checkbox>Youtube</Checkbox></div>
            <div className='Platform__fields'><Checkbox>Rutube</Checkbox></div>
            <div className='Platform__fields'><Checkbox>Вконтакте</Checkbox></div>
            <div className='Platform__fields'><Checkbox>Facebook</Checkbox></div>
            <div className='Platform__footer'><Checkbox>Dzen</Checkbox></div>
          </div>
        </div>

        <div className='Size__params'>
          <h1 className='Description__task'>Задать размеры вручную</h1>
          <div className='Size__area'><TextArea />
          </div>

        </div>

      </div>

      <div className='task__buttons'>
        <Link to={OrderStepsRoute.TaskMaterialStep}>
          <Button type='button' className='Btn__back'>Назад</Button>
        </Link>

        <Link to={OrderStepsRoute.DeadlineStep}>
          <Button type='button' className='Btn__continue'>Продолжить</Button>
        </Link>
      </div>
    </>
  )
}

export default TechnicalTask;
