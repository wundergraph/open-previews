import { useAuth } from "~/lib/auth";
import { useQuery } from "~/lib/wundergraph";

export const useUser = () => {
  const { token } = useAuth();
  return useQuery({
    operationName: "Viewer",
    enabled: !!token,
  });
};
