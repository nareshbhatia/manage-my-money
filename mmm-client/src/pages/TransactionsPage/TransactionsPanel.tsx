import React, { useContext } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react';
import { FlexContainer, Loading, Title } from '../../components';
import { RootStoreContext } from '../../contexts';

export const TransactionsPanel = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const { transactionStore } = rootStore;

    if (transactionStore.loading) {
        return <Loading />;
    }

    const { transactions } = transactionStore;
    const columnDefs: Array<ColDef> = [
        {
            headerName: 'Payee',
            field: 'payee'
        },
        {
            headerName: 'Amount',
            field: 'amount'
        }
    ];

    return (
        <React.Fragment>
            <Title>Transactions</Title>
            <FlexContainer className="ag-theme-balham">
                <AgGridReact columnDefs={columnDefs} rowData={transactions} />
            </FlexContainer>
        </React.Fragment>
    );
});
