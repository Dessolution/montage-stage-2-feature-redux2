import { Outlet, useLocation } from "react-router-dom"
import Header from "../Header/Header"
import Lmenu from "../LMenu/Lmenu";
import './Body.css'

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <div className='App'>
      <Header />
      <div className='container'>
        {(pathname !== '/orders/:id/chat') &&
          <Lmenu />}
        <div className='Body'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout