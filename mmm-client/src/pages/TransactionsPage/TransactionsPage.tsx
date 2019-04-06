import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {
    FlexRow,
    FlexColumn,
    FullHeightContainer,
    Header
} from '../../components';
import { AccountsPanel } from './AccountsPanel';
import { TransactionsPanel } from './TransactionsPanel';

const useStyles = makeStyles(theme => ({
    lhs: {
        minWidth: 200,
        backgroundColor: lighten(theme.palette.primary.main, 0.9)
    }
}));

export const TransactionsPage = () => {
    const classes = useStyles();

    return (
        <FullHeightContainer>
            <Header />
            <FlexRow>
                <FlexColumn className={classes.lhs}>
                    <AccountsPanel />
                </FlexColumn>
                <FlexColumn>
                    <TransactionsPanel />
                </FlexColumn>
            </FlexRow>
        </FullHeightContainer>
    );
};
