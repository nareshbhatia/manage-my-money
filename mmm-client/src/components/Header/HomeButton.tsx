import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Apps from '@material-ui/icons/Apps';
import { makeStyles } from '@material-ui/styles';
import { RouterState } from 'mobx-state-router';
import { RootStoreContext } from '../../contexts';

const useStyles = makeStyles({
    root: {
        marginLeft: -12
    }
});

export const HomeButton = () => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);
    const { routerStore } = rootStore;

    const handleClick = () => {
        routerStore.goTo(new RouterState('accounts'));
    };

    return (
        <IconButton
            className={classes.root}
            color="inherit"
            onClick={handleClick}
            aria-label="Home"
        >
            <Apps />
        </IconButton>
    );
};
