import React, { useContext } from 'react';
import { Theme } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import {
    ErrorFallbackComponent,
    Loading,
    HorizontalContainer,
    ViewVerticalContainer
} from '@nareshbhatia/react-force';
import { observer } from 'mobx-react';
import { Header } from '../../components';
import { RootStoreContext } from '../../contexts';
import { AccountList } from './AccountList';
import { AccountDetail } from './AccountDetail';

const useStyles = makeStyles((theme: Theme) => ({
    lhs: {
        minWidth: 200,
        overflow: 'auto',
        backgroundColor: lighten(theme.palette.primary.main, 0.9)
    },
    rhs: {
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
    }
}));

export const AccountsPage = observer(() => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);
    const { accountStore, categoryStore, transactionStore } = rootStore;

    // Show a single error message on the page, not one in each panel.
    if (accountStore.error) {
        return <ErrorFallbackComponent error={accountStore.error.message} />;
    }
    if (categoryStore.error) {
        return <ErrorFallbackComponent error={categoryStore.error.message} />;
    }
    if (transactionStore.error) {
        return (
            <ErrorFallbackComponent error={transactionStore.error.message} />
        );
    }

    // Show a single loading message on the page, not one in each panel.
    if (
        accountStore.loading ||
        categoryStore.loading ||
        transactionStore.loading
    ) {
        return <Loading />;
    }

    return (
        <ViewVerticalContainer>
            <Header />
            <HorizontalContainer minHeight={0}>
                <div className={classes.lhs}>
                    <AccountList />
                </div>
                <div className={classes.rhs}>
                    <AccountDetail />
                </div>
            </HorizontalContainer>
        </ViewVerticalContainer>
    );
});
