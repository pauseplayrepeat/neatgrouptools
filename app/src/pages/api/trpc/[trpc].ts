import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "~/env.mjs";
import { createTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onContextCreation: ({ req }) => {
    console.log(`🟢 Incoming request for ${req.url}`);
  },
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});

// import { createNextApiHandler } from "@trpc/server/adapters/next";
// import { appRouter } from "~/server/api/trpc";
// import { createTRPCContext } from "~/server/api/trpc";

// export default createNextApiHandler({
//   router: appRouter,
//   createContext: createTRPCContext,
// });
