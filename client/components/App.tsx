import React from "react";

import { ErrorBoundary } from "./ErrorBoundary";
import { Layout } from "./Layout";

export function App() {
  return (
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
  );
}
