import { LocalDate } from 'js-joda';

export interface Transaction {
    id: number;
    txnDate: LocalDate;
    payee: string;
    memo: string;
    amount: number;
    accountId: number;
    categoryId: number;
    balance: number;
}

export interface TransactionInput {
    id?: number;
    txnDate: string;
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
