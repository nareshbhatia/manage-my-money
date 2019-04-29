import React from 'react';
import { Theme } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import {
    FlexRow,
    FlexColumn,
    FullHeightContainer,
    Header
} from '../../components';
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

export const AccountsPage = () => {
    const classes = useStyles();

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
};
