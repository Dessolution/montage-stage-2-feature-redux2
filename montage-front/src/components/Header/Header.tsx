import React from 'react'
import Logo from '../Logo/Logo.tsx'
import './Header.css'

const Header: React.FC = () => {
  return (
    <div className='Header'>
      <Logo />
    </div>
  )
}

export default Header
