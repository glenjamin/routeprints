import React from "react";

export const ErrorBoundary: React.FC = ({ children }) => {
  return React.Children.only(children);
};
