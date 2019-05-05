import React from 'react';
import Typography from '@material-ui/core/Typography';
import { PageCenteredContainer } from '..';

export interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export interface ErrorBoundaryState {
    error: any;
}

function extractMessage(error: any) {
    return error instanceof Error ? error.message : 'Something went wrong';
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = {
        error: null
    };

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI
        return {
            error
        };
    }

    componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
        // Log the error to an error reporting service
        // logErrorToMyService(error, info);
        console.error(
            `error: ${extractMessage(error)} info: ${errorInfo.componentStack}`
        );
    }

    render() {
        if (this.state.error) {
            return (
                <PageCenteredContainer dark={true}>
                    <Typography component="h1" variant="h3">
                        {extractMessage(this.state.error)}
                    </Typography>
                </PageCenteredContainer>
            );
        }

        return this.props.children;
    }
}
