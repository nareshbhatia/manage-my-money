import React, { useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { observer } from 'mobx-react';
import { Loading, Title } from '../../components';
import { RootStoreContext } from '../../contexts';

export const TransactionsPanel = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const { transactionStore } = rootStore;

    if (transactionStore.loading) {
        return <Loading />;
    }

    const { transactions } = transactionStore;

    return (
        <React.Fragment>
            <Title>Transactions</Title>
            <List dense={true}>
                {transactions.map(transaction => (
                    <ListItem key={transaction.id}>
                        <ListItemText primary={transaction.payee} />
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
});
