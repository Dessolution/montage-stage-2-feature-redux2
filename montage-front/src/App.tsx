import './nullstyle.css'
import './App.css'
import { AppRoute } from './utils/const'
import { useLocation } from 'react-router-dom'
import { Suspense } from 'react'
import Header from './components/Header/Header'
import Lmenu from './components/LMenu/Lmenu'
import { AppRouter } from './providers/AppRouter'


export const App = () => {
    const { pathname } = useLocation();
    return (
        <div className='App'>
            <Suspense fallback={''}>
                <Header />
                <div className='container'>
                    {(pathname !== AppRoute.Chat) &&
                        <Lmenu />}
                    <div className='Body'>
                        <AppRouter />
                    </div>
                </div>
            </Suspense>
        </div>
    )
};
