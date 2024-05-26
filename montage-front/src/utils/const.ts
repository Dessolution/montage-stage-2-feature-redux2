export enum AppRoute {
    Main = '/',
    Projects = '/projects',
    ProjectsLinked= '/projects/linked',
    ProjectsStats = '/projects/statistics',
    Project = '/projects/:id',
    FinishedProjects = '/projects/finished',
    Profile = '/profile',
    PersonalData = '/profile/personaldata',
    Settings = '/profile/settings',
    Finance = '/profile/finance',
    Tariff = '/profile/tariff',
    MyOrders = '/orders',
    OrdersCurrent = '/orders/current',
    FinishedOrders= '/orders/finished',
    OrdersStats= '/orders/statistics',
    Order = '/orders/:id',
    NewOrder = '/neworder',
    Chat = '/orders/:id/chat',
    StoreTest = '/orders/storetest',
    NotFound = '*'
}