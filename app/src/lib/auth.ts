import React from "react";
import { openWindow } from "~/utils/open-window";
import { client } from "./wundergraph";

const setSessionToken = (token: string | null) => {
  if (token === null) {
    client.setExtraHeaders({
      "x-session-token": "",
    });
    return token;
  }

  localStorage.setItem("openpreviews.token", token);
  client.setExtraHeaders({
    "x-session-token": token,
  });

  return token;
};

export const useAuth = () => {
  const [popup, setPopup] = React.useState<Window | null>(null);
  const state = React.useMemo(() => Math.random().toString(36), []);
  const [token, setToken] = React.useState<string | null>(
    setSessionToken(localStorage.getItem("openpreviews.token"))
  );

  const login = () => {
    const params = new URLSearchParams({
      redirect_uri: `http://localhost:9991/webhooks/github-callback?state=${state}`,
    });
    const url = `http://localhost:9991/auth/cookie/authorize/github?${params.toString()}`;
    setPopup(openWindow(url, "mozillaWindow", 800, 600));
  };

  const logout = () => {
    setToken(() => setSessionToken(null));
  };

  const onMessage = (event: MessageEvent) => {
    if (event.origin !== "http://localhost:9991") {
      return;
    }

    if (event.data.id === "openpreviews.init") {
      popup?.postMessage({ id: "openpreviews.callback", state }, event.origin);
    }

    if (event.data.id === "openpreviews.success") {
      setToken(() => {
        return setSessionToken(event.data.token);
      });
      popup?.close();
      setPopup(null);
    }

    if (event.data.id === "openpreviews.failed") {
      popup?.close();
      setPopup(null);
    }
  };

  React.useEffect(() => {
    if (popup) {
      window.addEventListener("message", onMessage, false);
    }

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [popup]);

  return {
    login,
    logout,
    token,
  };
};
