import { styled } from "@macaron-css/react";
import { useAuth, useQuery, useUser } from "~/lib/wundergraph";
import { Button } from "./ui/button";
import { openWindow } from "~/utils/open-window";
import { useStore } from "@nanostores/react";
import { $commentMode, toggleCommentMode } from "~/utils/state/commentMode";

const Container = styled("div", {
  base: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    borderRadius: "10px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    display: "flex",
    zIndex: 1000,
  },
});

export const Toolbar = () => {
  const { logout } = useAuth();
  const { data: user } = useUser();
  const isCommentModeOn = useStore($commentMode);

  const signIn = () => {
    const redirect_uri = encodeURIComponent(`http://localhost:3000`);
    console.log(
      `http://localhost:9991/auth/cookie/authorize/github?redirect_uri=${redirect_uri}`
    );
    openWindow(
      `http://localhost:9991/auth/cookie/authorize/github?redirect_uri=${redirect_uri}`,
      "mozillaWindow",
      800,
      600
    );
  };
  return (
    <>
      {user ? (
        <>
          <button onClick={toggleCommentMode}>
            {isCommentModeOn ? "cancel" : "add comment!"}
          </button>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </>
  );
};
