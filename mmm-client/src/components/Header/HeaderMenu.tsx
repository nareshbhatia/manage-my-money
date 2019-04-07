import React, { Fragment, MouseEvent, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const HeaderMenu = () => {
    const [anchorEl, setAnchorEl] = useState<any>();
    const [open, setOpen] = useState(false);

    const handleMenuAnchorClick = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                <MenuItem onClick={handleClose}>Manage Accounts</MenuItem>
                <MenuItem onClick={handleClose}>Manage Categories</MenuItem>
            </Menu>
        </Fragment>
    );
};
