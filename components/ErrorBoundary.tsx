import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      let errorDetails = "";

      try {
        if (this.state.error?.message) {
          const parsedError = JSON.parse(this.state.error.message);
          if (parsedError.error) {
            errorMessage = "A database permission error occurred.";
            errorDetails = parsedError.error;
          }
        }
      } catch (e) {
        // Not a JSON error message, use default
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Oops! Something went wrong.</h2>
            <p className="text-slate-600 mb-4">{errorMessage}</p>
            {errorDetails && (
              <div className="bg-slate-100 p-3 rounded-lg text-left text-xs text-slate-700 font-mono overflow-auto mb-6">
                {errorDetails}
              </div>
            )}
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold w-full hover:bg-blue-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default ErrorBoundary;
