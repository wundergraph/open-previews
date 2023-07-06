import { useAuth } from "~/lib/auth";
import { useQuery } from "~/lib/wundergraph";
import {} from "swr/_internal";

export interface User {
  username: string;
  name: string;
  email: string;
  avatar: string;
}

export const useUser = () => {
  const { token } = useAuth();
  return useQuery({
    operationName: "User",
    enabled: !!token,
  });
};
