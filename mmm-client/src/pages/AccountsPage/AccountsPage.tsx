import React, { useContext } from 'react';
import { Theme } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import { observer } from 'mobx-react';
import {
    ErrorMessage,
    FlexRow,
    FlexColumn,
    FullHeightContainer,
    Header,
    Loading
} from '../../components';
import { RootStoreContext } from '../../contexts';
import { AccountList } from './AccountList';
import { AccountDetail } from './AccountDetail';

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        // see https://stackoverflow.com/questions/55896508/nested-scrolling-containers-using-flexbox
        minHeight: 0
    },
    lhs: {
        minWidth: 200,
        overflow: 'auto',
        backgroundColor: lighten(theme.palette.primary.main, 0.9)
    }
}));

export const AccountsPage = observer(() => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);
    const { accountStore, categoryStore, transactionStore } = rootStore;

    // Show a single error message on the page, not one in each panel.
    if (accountStore.error) {
        return <ErrorMessage>{accountStore.error.message}</ErrorMessage>;
    }
    if (categoryStore.error) {
        return <ErrorMessage>{categoryStore.error.message}</ErrorMessage>;
    }
    if (transactionStore.error) {
        return <ErrorMessage>{transactionStore.error.message}</ErrorMessage>;
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
        <FullHeightContainer>
            <Header />
            <FlexRow className={classes.row}>
                <div className={classes.lhs}>
                    <AccountList />
                </div>
                <FlexColumn>
                    <AccountDetail />
                </FlexColumn>
            </FlexRow>
        </FullHeightContainer>
    );
});
