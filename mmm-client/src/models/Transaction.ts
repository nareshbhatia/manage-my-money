import { Account } from './Account';
import { Category } from './Category';

export interface Transaction {
    id: number;
    txnDate: string;
    payee: string;
    memo: string;
    amount: number;
    account: Account;
    category: Category;
}
