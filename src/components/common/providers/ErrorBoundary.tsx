/**
 * Global error boundary component.
 *
 * @module components/providers/ErrorBoundary
 *
 * @remarks
 * Catches React errors and displays a user-friendly error screen.
 * Prevents the entire app from crashing when errors occur.
 *
 * @example
 * ```typescript
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { ErrorScreen } from '../ui/ErrorScreen';
import { parseError, logError } from '@/common/utils/error-handler';
import type { AppError } from '@/core/@types/common';

/**
 * Props for ErrorBoundary component.
 */
interface ErrorBoundaryProps {
  /** Child components to wrap */
  children: ReactNode;
  /** Optional custom fallback component */
  fallback?: ReactNode;
}

/**
 * State for ErrorBoundary component.
 */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The caught error */
  error: AppError | null;
}

/**
 * Error boundary component that catches React errors.
 *
 * @remarks
 * This component catches errors in child components and displays
 * a fallback UI instead of crashing the entire app.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * Initializes error boundary state.
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Updates state when an error is caught.
   *
   * @param error - The error that was caught
   * @returns New state
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Ignore expo-keep-awake errors (development only)
    if (error.message?.includes('keep awake')) {
      return { hasError: false, error: null };
    }

    const appError = parseError(error, 'ErrorBoundary');
    return { hasError: true, error: appError };
  }

  /**
   * Logs error information.
   *
   * @param error - The error that was caught
   * @param errorInfo - Additional error information
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Ignore expo-keep-awake errors (development only)
    if (error.message?.includes('keep awake')) {
      if (__DEV__) {
        console.warn('[ErrorBoundary] Ignoring expo-keep-awake error:', error.message);
      }
      return;
    }

    const appError = parseError(error, 'ErrorBoundary');
    logError(appError, 'ErrorBoundary');

    // Log component stack in development
    if (__DEV__) {
      console.error('Component stack:', errorInfo.componentStack);
    }
  }

  /**
   * Resets error state to retry rendering.
   */
  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  /**
   * Renders children or error fallback.
   */
  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error screen
      return (
        <ErrorScreen
          message={this.state.error?.message || 'Something went wrong'}
          onRetry={this.handleRetry}
          retryText="Try Again"
        />
      );
    }

    return this.props.children;
  }
}
