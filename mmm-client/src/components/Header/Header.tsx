import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AnalyzeButton } from './AnalyzeButton';
import { HeaderMenu } from './HeaderMenu';
import { HomeButton } from './HomeButton';

const useStyles = makeStyles({
    title: {
        flex: 1
    }
});

export const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <HomeButton />
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.title}
                >
                    Manage My Money
                </Typography>
                <AnalyzeButton />
                <HeaderMenu />
            </Toolbar>
        </AppBar>
    );
};
