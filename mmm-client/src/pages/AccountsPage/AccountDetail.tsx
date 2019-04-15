import React, { useContext, useState } from 'react';
import { AgGridEvent, CellDoubleClickedEvent, ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { LocalDate } from 'js-joda';
import { observer } from 'mobx-react';
import { FlexContainer, FloatingAddButton, Loading } from '../../components';
import { RootStoreContext } from '../../contexts';
import { Transaction, TransactionInput } from '../../models';
import { numberToMoney } from '../../utils';
import { AccountHeader } from './AccountHeader';
import { FormInput, TxnDialog } from './TxnDialog';

export const AccountDetail = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const { accountStore, categoryStore, transactionStore } = rootStore;

    const [showTxnDialog, setShowTxnDialog] = useState(false);
    const [isNewTxn, setNewTxn] = useState(true);
    const [formInput, setFormInput] = useState<FormInput>();

    if (transactionStore.loading) {
        return <Loading />;
    }

    const { selectedAccount: account } = accountStore;
    const { categories } = categoryStore;
    const { transactions } = transactionStore;

    // ----- Configure the grid -----

    // Override ag-grid material theme settings
    const gridSize = 6; // default is 8
    const rowHeight = gridSize * 6;
    const headerHeight = gridSize * 7;

    const defaultColDef = {
        resizable: true,
        filter: true,
        suppressMovable: true
    };
    const columnDefs: Array<ColDef> = [
        {
            headerName: 'Date',
            field: 'txnDate',
            cellRenderer: 'dateRenderer',
            filter: false
        },
        {
            headerName: 'Payee',
            field: 'payee'
        },
        {
            headerName: 'Category',
            field: 'category.name'
        },
        {
            headerName: 'Amount',
            field: 'amount',
            cellRenderer: 'moneyRenderer',
            type: 'numericColumn'
        },
        {
            headerName: 'Balance',
            field: 'balance',
            cellRenderer: 'moneyRenderer',
            type: 'numericColumn'
        },
        {
            headerName: 'Memo',
            field: 'memo'
        }
    ];
    const frameworkComponents = {
        dateRenderer: DateRenderer,
        moneyRenderer: MoneyRenderer
    };

    // Auto-size all columns onGridReady
    const handleGridReady = (params: AgGridEvent) => {
        const allColumnIds: Array<string> = [];
        params.columnApi.getAllColumns().forEach(column => {
            allColumnIds.push(column.getColId());
        });
        params.columnApi.autoSizeColumns(allColumnIds);
    };

    const handleCreateTransaction = () => {
        setNewTxn(true);
        setFormInput({
            txnDate: LocalDate.now().toString(),
            payee: '',
            memo: '',
            amount: '',
            accountId: account ? account.id : 0,
            categoryId: 0
        });
        // Do this last, otherwise TxnDialog will show previous data
        setShowTxnDialog(true);
    };

    const handleCellDoubleClicked = (e: CellDoubleClickedEvent) => {
        const txn: Transaction = e.data;
        setNewTxn(false);
        setFormInput({
            id: txn.id,
            txnDate: txn.txnDate.toString(),
            payee: txn.payee,
            memo: txn.memo || '',
            amount: numberToMoney(txn.amount),
            accountId: txn.account.id,
            categoryId: txn.category.id
        });
        // Do this last, otherwise TxnDialog will show previous data
        setShowTxnDialog(true);
    };

    const handleTxnDialogSave = (txn: TransactionInput) => {
        isNewTxn
            ? transactionStore.createTransaction(txn)
            : transactionStore.updateTransaction(txn);
        setShowTxnDialog(false);
    };

    const handleTxnDialogCancel = () => {
        setShowTxnDialog(false);
    };

    return (
        <React.Fragment>
            <AccountHeader
                accountName={account ? account.name : 'Select an account'}
                balance={transactions.length > 0 ? transactions[0].balance : 0}
            />

            <FlexContainer className="ag-theme-material">
                <AgGridReact
                    suppressCellSelection={true}
                    rowSelection="single"
                    headerHeight={headerHeight}
                    floatingFiltersHeight={headerHeight}
                    rowHeight={rowHeight}
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    frameworkComponents={frameworkComponents}
                    rowData={transactions}
                    onGridReady={handleGridReady}
                    onCellDoubleClicked={handleCellDoubleClicked}
                />
                <FloatingAddButton onClick={handleCreateTransaction} />
            </FlexContainer>

            {showTxnDialog && formInput && (
                <TxnDialog
                    formInput={formInput}
                    categories={categories}
                    onSave={handleTxnDialogSave}
                    onCancel={handleTxnDialogCancel}
                />
            )}
        </React.Fragment>
    );
});

interface DateRendererProps {
    value: Date;
}

const DateRenderer = ({ value }: DateRendererProps) => value.toString();

interface MoneyRendererProps {
    value: number;
}

const MoneyRenderer = ({ value }: MoneyRendererProps) => numberToMoney(value);
