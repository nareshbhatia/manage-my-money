import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
    CenteredContainer,
    ViewVerticalContainer
} from '@nareshbhatia/react-force';
import { Header } from '../../components';

export const NotFoundPage = () => {
    return (
        <ViewVerticalContainer>
            <Header />
            <CenteredContainer>
                <Typography variant="h3" color="textSecondary">
                    Page Not Found
                </Typography>
            </CenteredContainer>
        </ViewVerticalContainer>
    );
};
