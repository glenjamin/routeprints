import { default as React, CSSProperties } from "react";

import { Navbar } from "react-bootstrap";

const styles: { [name: string]: CSSProperties } = {
  page: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "column"
  },
  navbar: {
    flex: "0 1 auto"
  },
  belowNavbar: {
    display: "flex",
    flexDirection: "row",
    flex: "1 1 auto",
    borderTopWidth: 3,
    borderTopStyle: "ridge",
    borderTopColor: "#eee"
  },
  main: {
    flex: "1 1 auto"
  },
  rightBar: {
    borderLeftWidth: 3,
    borderLeftStyle: "ridge",
    borderLeftColor: "#eee",
    flex: "0 1 auto",
    width: 300
  },
  footer: {
    flex: "0 1 50px",
    borderTopWidth: 3,
    borderTopStyle: "ridge",
    borderTopColor: "#eee"
  }
};

export default function App() {
  return (
    <div style={styles.page}>
      <Navbar bg="light" style={styles.navbar}>
        <Navbar.Brand>RoutePrints</Navbar.Brand>
      </Navbar>
      <div style={styles.belowNavbar}>
        <div style={styles.main} />
        <div style={styles.rightBar} />
      </div>
      <div style={styles.footer} />
    </div>
  );
}
