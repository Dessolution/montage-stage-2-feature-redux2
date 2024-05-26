import {Navigate, NonIndexRouteObject} from 'react-router-dom';
import {AppRoute, OrderStepsRoute} from "./const";
import FinishedOrders from "../pages/MyOrdersPage/OrdersFinished";
import OrdersStats from "../pages/MyOrdersPage/OrdersStats";
import PersonalData from "../pages/ProfileSettingsPage/PersonalData";
import Settings from "../components/Settings/Settings";
import Finance from "../pages/ProfileSettingsPage/Finance";
import Tariff from "../pages/ProfileSettingsPage/Tariff";
import { MyOrdersPageAsync } from '../pages/MyOrdersPage/MyOrdersPage.async';
import OrdersCurrent from '../pages/MyOrdersPage/OrdersCurrent/OrdersCurrent';
import ProjectsStats from '../pages/MyProjectsPage/ProjectsStats/ProjectsStats';
import ProjectsLinked from '../pages/MyProjectsPage/ProjectsLinked/ProjectsLinked';
import TaskStep from '../pages/NewOrderPage/NewGraphicOrder/TaskStep';
import SubTaskStep from '../pages/NewOrderPage/NewGraphicOrder/SubTaskStep';
import TaskMaterial from '../pages/NewOrderPage/NewGraphicOrder/TaskMaterial';
import TechnicalTask from '../pages/NewOrderPage/NewGraphicOrder/TechnicalTask';
import TaskDeadline from '../pages/NewOrderPage/NewGraphicOrder/TaskDeadline';
import SpecialistLevel from '../pages/NewOrderPage/NewGraphicOrder/SpecialistLevel';
import OrderResult from '../pages/NewOrderPage/NewGraphicOrder/OrderResult';
import OrderSuccess from '../pages/NewOrderPage/NewGraphicOrder/OrderSuccess';
import { ChatPageAsync } from '../pages/ChatPage/ChatPage.async';
import { MyProjectsPageAsync } from '../pages/MyProjectsPage/MyProjectsPage.async';
import { ProfileSettingsPageAsync } from '../pages/ProfileSettingsPage/ProfileSettingsPage.async';
import { NewOrderPageAsync } from '../pages/NewOrderPage/NewOrderPage.async';
import { NotFoundPageAsync } from '../pages/NotFoundPage/NotFoundPage.async';


// константные пути из montage-front/src/utils/const.ts я бы перенесла сюда.
// ниже расписан вариант от Тимура, и в проекте использовать пути как например RoutePath.chat, но это наверно на вкус

// export enum AppRoutes {
//     MAIN = 'main',
//     PROJECTS = 'projects',
//     PROJECTS_LINKED = 'projects_linked',
//     PROJECTS_STATS = 'projects_stats',
//     PROJECT = 'project',
//     FINISHED_PROJECTS = 'finished_project',
//     PROFILE = 'profile',
//     PERSONAL_DATA = 'personal_data',
//     SETTINGS = 'settings',
//     FINANCE = 'finance',
//     TARIFF = 'tariff',
//     MY_ORDERS = 'my_orders',
//     ORDERS_CURRENT = 'orders_current',
//     FINISHED_ORDERS = 'finished_orders',
//     ORDERS_STATS = 'orders_stats',
//     ORDER = 'order',
//     NEW_ORDER = 'new_order',
//     CHAT = 'chat',
//     NOT_FOUND = 'not_found'
// }
//
// export const RoutePath: Record<AppRoutes, string> = {
//     [AppRoutes.MAIN]: '/',
//     [AppRoutes.PROJECTS]: '/projects',
//     [AppRoutes.PROJECTS_LINKED]: '/projects/statistics',
//     [AppRoutes.PROJECTS_STATS]: '/projects',
//     [AppRoutes.PROJECT]: '/projects/:id',
//     [AppRoutes.FINISHED_PROJECTS]: '/projects/finished',
//     [AppRoutes.PROFILE]: '/profile',
//     [AppRoutes.PERSONAL_DATA]: '/profile/personaldata',
//     [AppRoutes.SETTINGS]: '/profile/settings',
//     [AppRoutes.FINANCE]: '/profile/finance',
//     [AppRoutes.TARIFF]: '/profile/tariff',
//     [AppRoutes.MY_ORDERS]: '/orders',
//     [AppRoutes.ORDERS_CURRENT]: '/orders/current',
//     [AppRoutes.FINISHED_ORDERS]: '/orders/finished',
//     [AppRoutes.ORDERS_STATS]: '/orders/statistics',
//     [AppRoutes.ORDER]: '/orders/:id',
//     [AppRoutes.NEW_ORDER]: '/neworder',
//     [AppRoutes.CHAT]: '/orders/:id/chat',
//     // последний
//     [AppRoutes.NOT_FOUND]: '*',
// };


export const routeConfig: NonIndexRouteObject[] = [
    {
        path: AppRoute.Main,
        element:<Navigate to={AppRoute.OrdersCurrent}/>
    },
    {
        path: AppRoute.MyOrders,
        element: <MyOrdersPageAsync/>,
        children: [
            {
                path: AppRoute.OrdersCurrent,
                element: <OrdersCurrent/>,
                index: true,
            },
            {
                path: AppRoute.FinishedOrders,
                element: <FinishedOrders/>
            },
            {
                path: AppRoute.OrdersStats,
                element: <OrdersStats/>
            }
        ]
    },
    {
        path: AppRoute.Chat,
        element: <ChatPageAsync/>
    },
    {
        path: AppRoute.Projects,
        element: <MyProjectsPageAsync/>,
        children: [
            {
                path: AppRoute.ProjectsStats,
                element: <ProjectsStats/>
            },
            {
                index: true,
                path: AppRoute.ProjectsLinked,
                element: <ProjectsLinked/>
            },
        ]
    },
    {
        path: AppRoute.Profile,
        element: <ProfileSettingsPageAsync/>,
        children: [
            {
                index: true,
                path: AppRoute.PersonalData,
                element: <PersonalData/>
            },
            {
                path: AppRoute.Settings,
                element: <Settings/>
            },
            {
                path: AppRoute.Finance,
                element: <Finance/>
            },
            {
                path: AppRoute.Tariff,
                element: <Tariff/>
            }
        ]
    },
    {
        path: AppRoute.NewOrder,
        element: <NewOrderPageAsync/>,
        children: [
            {
                index: true,
                path: OrderStepsRoute.TaskStep,
                element: <TaskStep/>
            },
            {
                path: OrderStepsRoute.SubTaskStep,
                element: <SubTaskStep/>
            },
            {
                path: OrderStepsRoute.TaskMaterialStep,
                element: <TaskMaterial/>
            },
            {
                path: OrderStepsRoute.TechnicalTaskStep,
                element: <TechnicalTask/>
            },
            {
                path: OrderStepsRoute.DeadlineStep,
                element: <TaskDeadline/>
            },
            {
                path: OrderStepsRoute.SpecialistLevelStep,
                element: <SpecialistLevel/>
            },
            {
                path: OrderStepsRoute.OrderResultStep,
                element: <OrderResult/>
            },
            {
                path: OrderStepsRoute.OrderSuccessStep,
                element: <OrderSuccess/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFoundPageAsync/>
    }
]

