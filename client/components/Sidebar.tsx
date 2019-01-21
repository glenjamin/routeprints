import React from "react";
import { connect } from "react-redux";

import { ConnectToStrava } from "./ConnectToStrava";

type Props = {
  strava: any;
};

const Sidebar: React.FC<Props> = ({ strava }) => {
  return <div>{!strava ? <ConnectToStrava /> : <p>OK</p>}</div>;
};

function mapStateToProps(state: any) {
  return {
    strava: state.strava
  };
}

const ConnectedSidebar = connect(mapStateToProps)(Sidebar);

export { ConnectedSidebar as Sidebar };
