import React from 'react'
import Button from '../../../components/Button/Button'
import { Link } from 'react-router-dom';
import { AppRoute, OrderStepsRoute } from '../../../utils/const';

const SubTaskStep: React.FC = () => {

    return (
       <>
                <div className='Header__newOrder'>Выберите услугу</div>
                <div className="Choose__task">
                    <div className="task_field">
                        <label className="custom-radio">
                            <input type="radio" name="subTask" value="header" />
                            <span className='Span__field'>Дизайн шапки канала</span>
                        </label>
                    </div>

                    <div className="task_field">
                        <label className="custom-radio">
                            <input type="radio" name="subTask" value="logo" />
                            <span className='Span__field'>Разработка логотипа/аватарки</span>
                        </label>
                    </div>

                    <div className="task_field">
                        <label className="custom-radio">
                            <input type="radio" name="subTask" value="preview" />
                            <span className='Span__field'>Дизайн превью для ролика</span>
                        </label>
                    </div>
                    
                        <div className="recomendation">
                            Или закажите полный цикл услуг
                        </div>
                    
                    <div className="task_field outlined">
                        <label className="custom-radio">
                            <input type="radio" name="subTask" value="fullPack" />
                            <span className='Span__field'>Полный цикл</span>
                        </label>
                    </div>

                    <div className='task__buttons'>
                        <Link to={AppRoute.OrdersCurrent}>
                            {/* TODO: в макете кнопка отменить */}
                            <Button type='button' className='Btn__back' >Отмена</Button>
                        </Link>

                        <Link to={OrderStepsRoute.TaskMaterialStep}>
                            <Button type='button' className='Btn__continue'>Продолжить</Button>
                        </Link>
                    </div>
                </div>
            </>
    )
}

export default SubTaskStep;