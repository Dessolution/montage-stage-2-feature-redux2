import React from 'react'
import './ProjectFilterPanel.css'
import DropdownArrow from '../../assets/images/DropdownArrow'
import Button from '../Button/Button'


interface ProjectFilterPanelProps {
  children: React.ReactNode;
}

const ProjectFilterPanel: React.FC<ProjectFilterPanelProps> = () => {
  return (
    <div className='ProjectFilterPanel'>
      <Button className='ProjectFilterPanel__id item'>№<DropdownArrow /></Button>
      <div className='ProjectFilterPanel__name item'>Название проекта</div>
      <div className='ProjectFilterPanel__type item'>Тип проекта</div>
      <div className='ProjectFilterPanel__quantity item'>Количество заказов</div>
      <Button className='ProjectFilterPanel__dateAdded item'>Дата добавления<DropdownArrow /></Button>
      <Button className='ProjectFilterPanel__status item'>Статус<DropdownArrow /></Button>
      <div className='ProjectFilterPanel__action item'>Действие</div>
    </div >
  )
}

export default ProjectFilterPanel
