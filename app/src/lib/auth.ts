import React from "react";
import { openWindow } from "~/utils/open-window";
import { client } from "./wundergraph";
import { $sessionToken } from "~/stores/session-token";
import { useStore } from "@nanostores/react";

const gatewayUrl = import.meta.env.GATEWAY_URL || "http://localhost:9991";

$sessionToken.subscribe((token) => {
  if (token === null) {
    client.setExtraHeaders({
      "x-session-token": "",
    });
    return;
  }

  client.setExtraHeaders({
    "x-session-token": token,
  });
});

export const useAuth = () => {
  const [popup, setPopup] = React.useState<Window | null>(null);
  const state = React.useMemo(() => Math.random().toString(36), []);
  const token = useStore($sessionToken);
  const login = () => {
    const params = new URLSearchParams({
      redirect_uri: `${gatewayUrl}/webhooks/github-callback?state=${state}`,
    });
    const url = `${gatewayUrl}/auth/cookie/authorize/github?${params.toString()}`;
    setPopup(openWindow(url, "mozillaWindow", 800, 600));
  };

  const logout = () => {
    $sessionToken.set(null);
  };

  const onMessage = (event: MessageEvent) => {
    if (event.origin !== gatewayUrl) {
      return;
    }

    if (event.data.id === "openpreviews.init") {
      popup?.postMessage({ id: "openpreviews.callback", state }, event.origin);
    }

    if (event.data.id === "openpreviews.success") {
      $sessionToken.set(event.data.token);
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
