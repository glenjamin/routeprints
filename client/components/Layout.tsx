import React from "react";

import { Navbar } from "react-bootstrap";

import { Sidebar } from "./Sidebar";

const styles: { [name: string]: React.CSSProperties } = {
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
  sideBar: {
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

export function Layout() {
  return (
    <div style={styles.page}>
      <Navbar bg="light" style={styles.navbar}>
        <Navbar.Brand>RoutePrints</Navbar.Brand>
      </Navbar>
      <div style={styles.belowNavbar}>
        <div style={styles.main} />
        <div style={styles.sideBar}>
          <Sidebar />
        </div>
      </div>
      <div style={styles.footer} />
    </div>
  );
}
