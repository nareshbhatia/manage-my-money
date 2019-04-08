// Routes are matched from top to bottom. Make sure they are sequenced
// in the order of priority. It is generally best to sort them by pattern,
// prioritizing specific patterns over generic patterns (patterns with
// one or more parameters). For example:
//     /items
//     /items/:id

import { RouterState, RouterStore } from 'mobx-state-router';

export const routes = [
    {
        name: 'home',
        pattern: '/',
        beforeEnter: (
            fromState: RouterState,
            toState: RouterState,
            routerStore: RouterStore
        ) => {
            const { accountStore } = routerStore.rootStore;
            return accountStore.fetchAccounts().then(() => {
                const { accounts } = accountStore;
                const accountId = accounts.length > 0 ? accounts[0].id : 0;
                return Promise.reject(
                    new RouterState('accounts', {
                        accountId: accountId.toString()
                    })
                );
            });
        }
    },
    {
        name: 'accounts',
        pattern: '/accounts/:accountId',
        onEnter: (
            fromState: RouterState,
            toState: RouterState,
            routerStore: RouterStore
        ) => {
            const { accountStore } = routerStore.rootStore;
            const { accountId } = toState.params;

            // fire and forget
            accountStore.fetchAccounts();

            // this will trigger the fetch of transactions
            accountStore.setSelectedAccountId(parseInt(accountId, 10));

            // move on
            return Promise.resolve();
        }
    },
    {
        name: 'analyze',
        pattern: '/analyze'
    },
    {
        name: 'manageAccounts',
        pattern: '/manage-accounts'
    },
    {
        name: 'manageCategories',
        pattern: '/manage-categories'
    },
    { name: 'notFound', pattern: '/not-found' }
];
