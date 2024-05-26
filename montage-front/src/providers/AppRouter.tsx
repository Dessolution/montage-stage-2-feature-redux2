import { Suspense, memo, useCallback } from "react";
import { NonIndexRouteObject, Route, RouteProps, Routes } from "react-router-dom";
import { routeConfig } from "../utils/routeConfig";
import { PageLoader } from "../components/PageLoader/PageLoader";

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: NonIndexRouteObject, index: number) => {
        const element = (
            <Suspense fallback={<PageLoader/>}>
                    {route.element}
            </Suspense>
        );

        return <Route
            key={index}
            path={route.path}
            element={element}
        >

            {route.children && (route.children as RouteProps[]).map((childRoute: RouteProps, childIndex: number) => {
                    return (
                        <Route
                            key={childIndex}
                            index={childRoute?.index}
                            path={childRoute?.path}
                            element={childRoute.element}
                        />
                    )
                }
            )}
        </Route>
    }, []);

    return (
        <Routes>
            {routeConfig.map(renderWithWrapper)}
        </Routes>
    );
})