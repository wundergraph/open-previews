import { useAuth } from "~/lib/auth";
import { useQuery } from "~/lib/wundergraph";

export const useUser = (
  options?: Omit<Parameters<typeof useQuery>[0], "operationName" | "input">
) => {
  const { token } = useAuth();
  return useQuery({
    operationName: "User",
    enabled: !!token,
    ...options,
  });
};
