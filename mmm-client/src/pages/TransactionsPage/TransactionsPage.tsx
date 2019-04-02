import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {
    FlexContainer,
    FlexRow,
    FullHeightContainer,
    Header,
    wrapTheme
} from '../../components';
import { AccountsPanel } from './AccountsPanel';
import { TransactionsPanel } from './TransactionsPanel';

const useStyles = makeStyles(theme => ({
    lhs: {
        minWidth: 200,
        backgroundColor: lighten(theme.palette.primary.main, 0.9)
    }
}));

export const TransactionsPage = wrapTheme(() => {
    const classes = useStyles();

    return (
        <FullHeightContainer>
            <Header />
            <FlexRow>
                <div className={classes.lhs}>
                    <AccountsPanel />
                </div>
                <FlexContainer>
                    <TransactionsPanel />
                </FlexContainer>
            </FlexRow>
        </FullHeightContainer>
    );
});
