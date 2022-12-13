import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const serverRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.server.findMany();
  }),
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.server.create({
        data: {
          name: input.name,
          owner: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
          channels: {
            create: {
              name: "general",
            },
          },
        },
      });
    }),
});
