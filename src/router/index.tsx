import { createBrowserRouter } from 'react-router-dom';

import { App } from '@root/App';
import { WithSuspense } from '@root/hocs/WithSuspense';
import { HomePage } from '@root/pages/HomePage';
import { NotFoundPage } from '@root/pages/NotFoundPage';

import { RoutesPath } from './routes';

export const router = createBrowserRouter([
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
            }
        ]
    }
]);
