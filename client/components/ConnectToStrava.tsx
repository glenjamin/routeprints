import React from "react";
import { connect } from "react-redux";

import { Button, Image, Alert } from "react-bootstrap";

import { Dispatch, action } from "../connection";
import { OauthCallbackResult } from "../../common/oauth";

import image from "../images/btn_strava_connectwith_orange@2x.png";

declare global {
  interface Window {
    stravaOAuth2Callback: (data: OauthCallbackResult) => void;
  }
}

type Props = {
  dispatch: Dispatch;
};
const ConnectToStrava: React.FC<Props> = ({ dispatch }) => {
  const [error, setError] = React.useState(null as string | null);
  function connectToStrava() {
    setError(null);
    window.open("/strava/auth/connect");
    window.stravaOAuth2Callback = data => {
      if ("error" in data) {
        setError(data.error);
        return;
      }
      dispatch(action("STRAVA_CONNECTED"));
    };
  }
  return (
    <>
      <Button variant="link" onClick={connectToStrava}>
        <Image fluid src={image} />
      </Button>
      {error && (
        <Alert variant="danger">Error connecting to Strava: {error}</Alert>
      )}
    </>
  );
};

const ConnectedConnectToStrava = connect()(ConnectToStrava);

export { ConnectedConnectToStrava as ConnectToStrava };
