import React, { Suspense } from 'react';
import { ErrorBoundary, Loading } from '@nareshbhatia/react-force';
import { HistoryAdapter } from 'mobx-state-router';
import { RootStoreContext } from './contexts';
import { Router } from './Router';
import { RootStore } from './stores';
import { history } from './utils';

// Create the rootStore
const rootStore = new RootStore();
rootStore.init();

// Observe history changes
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

export const App = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loading />}>
                <RootStoreContext.Provider value={rootStore}>
                    <Router />
                </RootStoreContext.Provider>
            </Suspense>
        </ErrorBoundary>
    );
};
