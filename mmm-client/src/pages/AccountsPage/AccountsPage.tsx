import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {
    FlexRow,
    FlexColumn,
    FullHeightContainer,
    Header
} from '../../components';
import { AccountList } from './AccountList';
import { AccountDetail } from './AccountDetail';

const useStyles = makeStyles(theme => ({
    lhs: {
        minWidth: 200,
        backgroundColor: lighten(theme.palette.primary.main, 0.9)
    }
}));

export const AccountsPage = () => {
    const classes = useStyles();

    return (
        <FullHeightContainer>
            <Header />
            <FlexRow>
                <div className={classes.lhs}>
                    <AccountList />
                </div>
                <FlexColumn>
                    <AccountDetail />
                </FlexColumn>
            </FlexRow>
        </FullHeightContainer>
    );
};
