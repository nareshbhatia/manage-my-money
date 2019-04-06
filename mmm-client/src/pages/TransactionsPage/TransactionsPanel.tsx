import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react';
import { Loading, Title } from '../../components';
import { RootStoreContext } from '../../contexts';

const useStyles = makeStyles({
    gridContainer: {
        height: 500
    }
});

export const TransactionsPanel = observer(() => {
    const classes = useStyles();
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
            <div className={`ag-theme-balham ${classes.gridContainer}`}>
                <AgGridReact columnDefs={columnDefs} rowData={transactions} />
            </div>
        </React.Fragment>
    );
});
