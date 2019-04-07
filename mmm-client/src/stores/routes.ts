// Routes are matched from top to bottom. Make sure they are sequenced
// in the order of priority. It is generally best to sort them by pattern,
// prioritizing specific patterns over generic patterns (patterns with
// one or more parameters). For example:
//     /items
//     /items/:id

import { RouterState, RouterStore } from 'mobx-state-router';

export const routes = [
    {
        name: 'accounts',
        pattern: '/',
        onEnter: (
            fromState: RouterState,
            toState: RouterState,
            routerStore: RouterStore
        ) => {
            const { accountStore } = routerStore.rootStore;
            accountStore.fetchAccounts(); // fire and forget
            return Promise.resolve(); // move on
        }
    },
    { name: 'notFound', pattern: '/not-found' }
];
