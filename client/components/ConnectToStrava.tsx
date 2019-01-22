import React from "react";
import { connect } from "react-redux";

import { Button, Image } from "react-bootstrap";

import image from "../images/btn_strava_connectwith_orange@2x.png";

declare global {
  interface Window {
    stravaOAuth2Callback: (data: any) => void;
  }
}

type Props = {
  stravaConnected: (auth: any) => void;
};
const ConnectToStrava: React.FC<Props> = ({ stravaConnected }) => {
  function connectToStrava() {
    window.stravaOAuth2Callback = data => {
      if (data.error) {
        console.warn(data);
        return;
      }
      stravaConnected(data);
    };
    window.open("/strava/auth/connect");
  }
  return (
    <Button variant="link" onClick={connectToStrava}>
      <Image fluid src={image} />
    </Button>
  );
};

function stravaConnected(payload: any) {
  return {
    type: "STRAVA_CONNECTED",
    payload
  };
}

const ConnectedConnectToStrava = connect(
  null,
  {
    stravaConnected
  }
)(ConnectToStrava);

export { ConnectedConnectToStrava as ConnectToStrava };
