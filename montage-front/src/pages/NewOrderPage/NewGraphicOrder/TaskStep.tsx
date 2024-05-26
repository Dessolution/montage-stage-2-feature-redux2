import React, { useEffect } from 'react'
import Radio from '../../../components/Radio/Radio'
import Button from '../../../components/Button/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppRoute, OrderStepsRoute, STEP_BACK } from '../../../utils/const'

const TaskStep: React.FC = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(()=> {
if (pathname === AppRoute.NewOrder) {
    navigate(OrderStepsRoute.TaskStep)
}
    });
    return (
        <>
            <div className='Header__newOrder'>Выберите услугу</div>
            <div className="Choose__task">
                <div className="task_field">
                    <Radio>Видеомонтаж</Radio>
                </div>

                <div className="task_field">
                    <Radio>Аудиомонтаж</Radio>
                </div>

                <div className="task_field">
                    <Radio>Графика</Radio>
                </div>

                <div className="task_field">
                    <Radio>Продюссирование</Radio>
                </div>

                <div className='task__buttons__main'>

                    <Button type='button' className='Btn__back' onClick={() => navigate(STEP_BACK)}> Назад</Button>
                    <Link to={OrderStepsRoute.SubTaskStep}><Button type='button' className='Btn__continue'>Продолжить</Button></Link>
                </div>


            </div>
        </>
    )
}

export default TaskStep;