import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import MainLayout from '../features/layouts/MainLayout.tsx';

import { HomeIcon } from '@heroicons/react/24/outline';

import { Fragment } from 'react/jsx-runtime';

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: () => (
        <div className="flex h-[70vh] flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-xl">Page not found</p>
            <button className="btn btn-secondary mt-4" onClick={() => (window.location.href = '/')}>
                <HomeIcon className="h-4 w-4" /> Go back
            </button>
        </div>
    ),
});

function RootComponent() {
    return (
        <Fragment>
            <MainLayout>
                <Outlet />
            </MainLayout>
            <TanStackRouterDevtools position="bottom-right" />
        </Fragment>
    );
}
