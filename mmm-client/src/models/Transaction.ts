import { Account } from './Account';
import { Category } from './Category';

export interface Transaction {
    id: number;
    txnDate: Date;
    payee: string;
    memo: string;
    amount: number;
    account: Account;
    category: Category;
    balance: number;
}

export interface TransactionSummaryByCategory {
    catId: number;
    catName: string;
    amount: number;
}
