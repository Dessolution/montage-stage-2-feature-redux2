import React from 'react'
import './FilterPanel.css'

interface FilterPanelProps {
  children: React.ReactNode;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ children }) => {
  return (
    <div className='FilterPanel'>
      <nav className='Project__id'>{children}</nav>
      <h1 className='Project__name'>{children}</h1>
      <h1 className='Project__type'>{children}</h1>
      <h1 className='Project__quantity'>{children}</h1>
      <nav className='Date__added'>{children}</nav>
      <nav className='Status'>{children}</nav>
      <h1 className='Action'>{children}</h1>
    </div>
  )
}

export default FilterPanel
