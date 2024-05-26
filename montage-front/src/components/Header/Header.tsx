import React from 'react'
import './Header.css'
import HeaderRMenu from '../HeaderRMenu/HeaderRMenu.tsx'
import Logo from '../Logo/Logo.tsx'



const Header: React.FC = () => {
  return (
    <div className='Header'>
      <div className='Logo'><Logo/></div>
      
      <HeaderRMenu/>
    </div>
  )
}

export default Header
