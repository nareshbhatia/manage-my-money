import React, { useContext } from 'react';
import { ColDef, AgGridEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react';
import { FlexContainer, Loading } from '../../components';
import { RootStoreContext } from '../../contexts';
import { formatDate, formatMoney } from '../../utils';
import { AccountHeader } from './AccountHeader';

export const AccountDetail = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const { accountStore, transactionStore } = rootStore;

    if (transactionStore.loading) {
        return <Loading />;
    }

    const { selectedAccount: account } = accountStore;
    const { transactions } = transactionStore;

    // Configure the grid
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
    const onGridReady = (params: AgGridEvent) => {
        const allColumnIds: Array<string> = [];
        params.columnApi.getAllColumns().forEach(column => {
            allColumnIds.push(column.getColId());
        });
        params.columnApi.autoSizeColumns(allColumnIds);
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
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    frameworkComponents={frameworkComponents}
                    rowData={transactions}
                    onGridReady={onGridReady}
                />
            </FlexContainer>
        </React.Fragment>
    );
});

interface DateRendererProps {
    value: Date;
}

const DateRenderer = ({ value }: DateRendererProps) => formatDate(value);

interface MoneyRendererProps {
    value: number;
}

const MoneyRenderer = ({ value }: MoneyRendererProps) => formatMoney(value);
