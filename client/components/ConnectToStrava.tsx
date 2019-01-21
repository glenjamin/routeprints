import React from "react";

import { Button, Image } from "react-bootstrap";

import image from "../images/btn_strava_connectwith_orange@2x.png";

declare global {
  interface Window {
    stravaOAuth2Callback: (data: object) => void;
  }
}

function connectToStrava() {
  window.stravaOAuth2Callback = data => {
    console.log(data);
  };
  window.open("/strava/auth/connect");
}

export const ConnectToStrava: React.FC = () => {
  return (
    <Button variant="link" onClick={connectToStrava}>
      <Image fluid src={image} />
    </Button>
  );
};
