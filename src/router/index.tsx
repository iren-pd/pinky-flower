import { createBrowserRouter } from 'react-router-dom';

import { App } from '@root/App';
import { HomePage } from '@root/pages/HomePage';
import { RoutesPath } from '@root/router/routes';

export const router = createBrowserRouter([
    {
        path: RoutesPath.Root,
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            }
        ]
    }
]);
