export enum AppRoute {
    Main = '/',
    Projects = '/projects',
    ProjectsLinked = '/projects/linked',
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
    FinishedOrders = '/orders/finished',
    OrdersStats = '/orders/statistics',
    Order = '/orders/:id',
    NewOrder = '/neworder',
    Chat = '/orders/:id/chat',
    NotFound = '*'
}

export enum OrderStepsRoute {
    TaskStep = '/neworder/step1',
    SubTaskStep = '/neworder/step2',
    TaskMaterialStep = '/neworder/step3',
    TechnicalTaskStep = '/neworder/step4',
    DeadlineStep = '/neworder/step5',
    SpecialistLevelStep = '/neworder/step6',
    OrderResultStep = '/neworder/step7',
    OrderSuccessStep = '/neworder/step8'
}

export const STEP_BACK = -1;

export enum OrderStepTitles {
    Material = 'Материал',
    TechTask = 'Тех. задание',
    Deadline = 'Сроки',
    Specialist = 'Специалист',
    Result = 'Результат'
}
