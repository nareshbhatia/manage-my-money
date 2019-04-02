import { RouterState, RouterStore } from 'mobx-state-router';
import { AccountStore } from './AccountStore';
import { routes } from './routes';

const notFound = new RouterState('notFound');

export class RootStore {
    accountStore = new AccountStore(this);
    routerStore = new RouterStore(this, routes, notFound);
}
