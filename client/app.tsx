import React from "react";

import { ErrorBoundary } from "./ErrorBoundary";
import { Layout } from "./components/Layout";

export function App() {
  return (
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
  );
}
