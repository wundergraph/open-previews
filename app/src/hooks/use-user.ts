import { useAuth } from "~/lib/auth";
import { useQuery } from "~/lib/wundergraph";
import {} from "swr/_internal";
import { useEffect } from "react";

export interface User {
  username: string;
  name: string;
  email: string;
  avatar: string;
}

export const useUser = () => {
  const { token } = useAuth();
  const user = useQuery({
    operationName: "User",
    enabled: !!token,
  });

  useEffect(() => {
    if (token) {
      user.mutate();
    }
  }, [])

  return user
};
