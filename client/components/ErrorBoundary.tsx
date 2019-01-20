import React from "react";

import RedBox from "redbox-react";

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<{}, State> {
  state: State = { error: null };
  static getDerivedStateFromError(err: Error) {
    return { error: err };
  }
  // attempt to clear error after hot reloading has kicked in
  componentDidUpdate(_prevProps: {}, prevState: State) {
    if (prevState.error && prevState.error === this.state.error) {
      this.setState({ error: null });
    }
  }
  render() {
    const { error } = this.state;
    if (error) {
      return <RedBox error={error} />;
    }
    return React.Children.only(this.props.children);
  }
}
