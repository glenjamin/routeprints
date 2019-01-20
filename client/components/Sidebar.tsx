import React from "react";
import { connect } from "react-redux";

function Sidebar() {
  return <p>Sidebar!</p>;
}

function mapStateToProps(state: any) {
  return {
    strava: state.strava
  };
}

const ConnectedSidebar = connect(mapStateToProps)(Sidebar);

export { ConnectedSidebar as Sidebar };
