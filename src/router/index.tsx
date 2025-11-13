import { createBrowserRouter } from 'react-router-dom';

import { App } from '@root/App';
import { WithSuspense } from '@root/hocs/WithSuspense';
import { HomePage } from '@root/pages/HomePage';
import { LoginPage } from '@root/pages/LoginPage';
import { NotFoundPage } from '@root/pages/NotFoundPage';
import { RegisterPage } from '@root/pages/RegisterPage';
import { RoutesPath } from '@root/router/routes';

export const router = createBrowserRouter(
    [
        {
            path: RoutesPath.Root,
            element: <App />,
            children: [
                {
                    // index: true means that this route is the default route
                    index: true,
                    element: <HomePage />
                },
                {
                    path: RoutesPath.NotFound,
                    element: WithSuspense(<NotFoundPage />)
                },
                {
                    path: RoutesPath.Login,
                    element: WithSuspense(<LoginPage />)
                },
                {
                    path: RoutesPath.Register,
                    element: WithSuspense(<RegisterPage />)
                }
            ]
        }
    ],
    { basename: import.meta.env.BASE_URL }
);
