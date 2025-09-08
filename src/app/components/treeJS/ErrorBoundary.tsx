'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('WebGL Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                3D Model Unavailable
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                WebGL not supported or model failed to load
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
