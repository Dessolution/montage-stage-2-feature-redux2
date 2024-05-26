import React from 'react';
import './ProjectsStats.css'
import FilterPanel from '../../../components/FilterPanel/FilterPanel';
const ProjectsStats : React.FC = () => {
    return (
            <div className='Project__stats'>
        <div className='Finance__container'>
            <div className='Finance__projects__title'>Финансы по проектам</div>
            <div className='Finance__body'>
                <div className='Card1'>
                    <h1 className='Card__text'>Блог путешественника</h1>
                    <div className='Card__info'>

                    </div>
                </div>
                <div className='Card2'>
                    <h1 className='Card__text'>Подкаст БНГТВ</h1>
                    <div className='Card__info'>
                        
                    </div>
                </div>
                <div className='Card3'>
                <h1 className='Card__text'>Видеоуроки по таро</h1>
                <div className='Card__info'>
                        
                    </div>
                </div>
                <div className='Card4'>
                <h1 className='Card__text'>Блогерская тусовка</h1>
                <div className='Card__info'>
                        
                    </div>
                </div>
            </div>
        </div>

        <div className='Orders__projects'>
        <div className='Orders__field__title'>Заказов по проектам</div>
        <FilterPanel />
        </div>

        </div>
        
    )
}

export default ProjectsStats;