import React from 'react'
import './ProjectCell.css'

interface ProjectCellProps {
  children: React.ReactNode;
}


const ProjectCell: React.FC<ProjectCellProps> = ({ children }) =>  {
  return (
    <div className='ProjectCell'>
        <div className='Cells'>
        <div className='Project__info__id'>{ children }</div>
        <div className='Project__info__name'>{ children }</div>
        <div className='Project__info__type'>{ children }</div>
        <div className='Project__info__quantity'>{ children }</div>
        <div className='Project__info__data'>{ children }</div>
        <div className='Project__info__status'>{ children }</div>
        </div>
        
    </div>
  )
}

export default ProjectCell