import React, { useContext } from 'react';
import { RouterView } from 'mobx-state-router';
import { RootStoreContext } from './contexts';
import { AccountsPage, NotFoundPage } from './pages';

// Create a viewMap for the RouterView
const viewMap = {
    accounts: <AccountsPage />,
    notFound: <NotFoundPage />
};

export const Router = () => {
    const rootStore = useContext(RootStoreContext);
    const { routerStore } = rootStore;

    return <RouterView routerStore={routerStore} viewMap={viewMap} />;
};
