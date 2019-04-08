import React, { useContext } from 'react';
import { RouterView } from 'mobx-state-router';
import { RootStoreContext } from './contexts';
import {
    AccountsPage,
    AnalyzePage,
    ManageAccountsPage,
    ManageCategoriesPage,
    NotFoundPage
} from './pages';

// Create a viewMap for the RouterView
const viewMap = {
    accounts: <AccountsPage />,
    analyze: <AnalyzePage />,
    manageAccounts: <ManageAccountsPage />,
    manageCategories: <ManageCategoriesPage />,
    notFound: <NotFoundPage />
};

export const Router = () => {
    const rootStore = useContext(RootStoreContext);
    const { routerStore } = rootStore;

    return <RouterView routerStore={routerStore} viewMap={viewMap} />;
};
