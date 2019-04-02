import React from 'react';

import Typography from '@material-ui/core/Typography';
import {
    CenteredContainer,
    FullHeightContainer,
    Header,
    wrapTheme
} from '../../components';

export const NotFoundPage = wrapTheme(() => {
    return (
        <FullHeightContainer>
            <Header />
            <CenteredContainer>
                <Typography variant="h3" color="textSecondary">
                    Page Not Found
                </Typography>
            </CenteredContainer>
        </FullHeightContainer>
    );
});
