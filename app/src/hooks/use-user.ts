import { useEffect } from "react";
import { useAuth } from "~/lib/auth";
import { useQuery } from "~/lib/wundergraph";

export const useUser = () => {
  const { token } = useAuth();

  return useQuery({
    operationName: "User",
    enabled: !!token,
  });
};
