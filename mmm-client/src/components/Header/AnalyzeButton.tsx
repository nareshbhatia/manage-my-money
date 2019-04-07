import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { RouterState } from 'mobx-state-router';
import { RootStoreContext } from '../../contexts';

export const AnalyzeButton = () => {
    const rootStore = useContext(RootStoreContext);
    const { routerStore } = rootStore;

    const handleClick = () => {
        routerStore.goTo(new RouterState('analyze'));
    };

    return (
        <Button color="inherit" onClick={handleClick} aria-label="Analyze">
            Analyze
        </Button>
    );
};
