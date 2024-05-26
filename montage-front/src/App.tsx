import './nullstyle.css'
import './App.css'
import { AppRoute } from './utils/const'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProfileSettings from './pages/ProfileSettingsPage/ProfileSettingsPage'
import MyOrdersPage from './pages/MyOrdersPage/MyOrdersPage'
import FinishedOrders from './pages/MyOrdersPage/OrdersFinished'
import OrdersStats from './pages/MyOrdersPage/OrdersStats'
import ChatPage from './pages/ChatPage/ChatPage'
import NewOrder from './pages/NewOrderPage/NewOrder'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import OrdersCurrent from './pages/MyOrdersPage/OrdersCurrent'
import MyProjectsPage from './pages/MyProjectsPage/MyProjectsPage'
import ProjectsStats from './pages/MyProjectsPage/ProjectsStats'
import ProjectsLinked from './pages/MyProjectsPage/ProjectsLinked'
import PersonalData from './pages/ProfileSettingsPage/PersonalData'
import Settings from './components/Settings/Settings'
import Finance from './pages/ProfileSettingsPage/Finance'
import Tariff from './pages/ProfileSettingsPage/Tariff'
import { Counter } from './app/entities/Counter/ui/Counter'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Layout />}>
        <Route
          index
          element={<MyOrdersPage />}
        />
        <Route
          path={AppRoute.MyOrders}
          element={<MyOrdersPage />}
        >
          <Route
            index
            element={<OrdersCurrent />}
          />
          <Route
            path={AppRoute.OrdersCurrent}
            element={<OrdersCurrent />}
          />

          <Route
            path={AppRoute.FinishedOrders}
            element={<FinishedOrders />}
          />
          <Route
            path={AppRoute.OrdersStats}
            element={<OrdersStats />}
          />
          <Route
            path={AppRoute.StoreTest}
            element={<Counter />}
          />
        </Route>

        <Route
          path={AppRoute.Chat}
          element={<ChatPage />}
        />

        <Route
          path={AppRoute.Projects}
          element={<MyProjectsPage />}
        >
          <Route
            path={AppRoute.ProjectsStats}
            element={<ProjectsStats />}
          />
          <Route
            path={AppRoute.ProjectsLinked}
            element={<ProjectsLinked />}
          />
          <Route
            index
            element={<ProjectsLinked />}
          />
        </Route>

        <Route
          path={AppRoute.Profile}
          element={<ProfileSettings />}
        >
          <Route
            index
            element={<PersonalData />} />
          <Route
            path={AppRoute.PersonalData}
            element={<PersonalData />}
          />
          <Route
            path={AppRoute.Settings}
            element={<Settings />}
          />
          <Route
            path={AppRoute.Finance}
            element={<Finance />}
          />
          <Route
            path={AppRoute.Tariff}
            element={<Tariff />}
          />
        </Route>

        <Route
          path={AppRoute.NewOrder}
          element={<NewOrder />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes >
  )
}

export default App;
