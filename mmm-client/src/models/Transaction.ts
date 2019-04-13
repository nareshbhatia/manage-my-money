import { LocalDate } from 'js-joda';
import { Account } from './Account';
import { Category } from './Category';

export interface Transaction {
    id: number;
    txnDate: LocalDate;
    payee: string;
    memo: string;
    amount: number;
    account: Account;
    category: Category;
    balance: number;
}

export interface TransactionInput {
    id?: number;
    txnDate: LocalDate;
    payee: string;
    memo: string;
    amount: number;
    accountId: number;
    categoryId: number;
}

export interface TransactionSummaryByCategory {
    catId: number;
    catName: string;
    amount: number;
}
