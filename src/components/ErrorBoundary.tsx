import React from 'react';
import { Box } from 'grommet';

export class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean; error: null | Error }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('### ErrorBoundary', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box align="center" justify="center">
          <h1>Something went wrong.</h1>
          <Box>{this.state.error.toString()}</Box>
        </Box>
      );
    }

    return this.props.children;
  }
}
