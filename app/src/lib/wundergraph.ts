import { createClient, Operations } from "../generated/client";

import { createHooks } from "@wundergraph/swr";

export const client = createClient();

export const { useQuery, useMutation, useSubscription } =
  createHooks<Operations>(client);
