import React, { Fragment, MouseEvent, useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { RootStoreContext } from '../../contexts';

export const HeaderMenu = () => {
    const rootStore = useContext(RootStoreContext);
    const { routerStore } = rootStore;
    const [anchorEl, setAnchorEl] = useState<any>();
    const [open, setOpen] = useState(false);

    const handleMenuAnchorClick = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleManageAccounts = () => {
        routerStore.goTo('manageAccounts');
    };

    const handleManageCategories = () => {
        routerStore.goTo('manageCategories');
    };

    return (
        <Fragment>
            <IconButton
                color="inherit"
                onClick={handleMenuAnchorClick}
                aria-owns="menu"
                aria-haspopup="true"
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleManageAccounts}>
                    Manage Accounts
                </MenuItem>
                <MenuItem onClick={handleManageCategories}>
                    Manage Categories
                </MenuItem>
            </Menu>
        </Fragment>
    );
};
