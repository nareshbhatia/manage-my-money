import React, { useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import { observer } from 'mobx-react';
import { FlexContainer, Loading, Title } from '../../components';
import { RootStoreContext } from '../../contexts';

const useStyles = makeStyles({
    listItem: {
        cursor: 'pointer'
    }
});

export const AccountsPanel = observer(() => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);
    const { accountStore } = rootStore;

    if (accountStore.loading) {
        return <Loading />;
    }

    const { accounts, selectedAccountId } = accountStore;

    const handleClick = (accountId: number) => {
        accountStore.setSelectedAccountId(accountId);
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
