import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <h1 style={{ fontSize: 35, marginTop: 100 }}>
          Oops! Something went wrong. Please try refreshing the page or come
          back later.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
