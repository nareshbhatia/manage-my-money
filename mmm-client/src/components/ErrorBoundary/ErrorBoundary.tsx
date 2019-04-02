import React from 'react';

export interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export interface ErrorBoundaryState {
    hasError: boolean;
    message?: string;
}

function extractMessage(error: Error | string = 'Something went wrong') {
    return error instanceof Error ? error.message : error;
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    static getDerivedStateFromError(error: Error | string) {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            message: extractMessage(error)
        };
    }

    state: ErrorBoundaryState = {
        hasError: false
    };

    componentDidCatch(error: Error | string, errorInfo: React.ErrorInfo) {
        // Log the error to an error reporting service
        // logErrorToMyService(error, info);
        console.error(
            `error: ${extractMessage(error)} info: ${errorInfo.componentStack}`
        );
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.message}</h1>;
        }

        return this.props.children;
    }
}
