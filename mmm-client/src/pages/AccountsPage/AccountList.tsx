import React, { useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import { FlexContainer } from '@nareshbhatia/react-force';
import { observer } from 'mobx-react';
import { Title } from '../../components';
import { RootStoreContext } from '../../contexts';

const useStyles = makeStyles({
    listItem: {
        cursor: 'pointer'
    }
});

export const AccountList = observer(() => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);
    const { accountStore, routerStore } = rootStore;

    const { accounts, selectedAccountId } = accountStore;

    const handleClick = (accountId: number) => {
        routerStore.goTo('accounts', { accountId: accountId.toString() });
    };

    return (
        <React.Fragment>
            <Title>Accounts</Title>
            <FlexContainer>
                <List dense={true} disablePadding={true}>
                    {accounts.map(account => (
                        <ListItem
                            className={classes.listItem}
                            key={account.id}
                            selected={account.id === selectedAccountId}
                            onClick={() => handleClick(account.id)}
                        >
                            <ListItemText primary={account.name} />
                        </ListItem>
                    ))}
                </List>
            </FlexContainer>
        </React.Fragment>
    );
});
