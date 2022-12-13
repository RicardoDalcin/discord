import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { serverRouter } from "./server";

export const appRouter = router({
  auth: authRouter,
  example: exampleRouter,
  server: serverRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
