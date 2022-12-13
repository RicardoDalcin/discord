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
  show: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.server.findUnique({
        where: {
          id: input.id,
        },
        include: {
          channels: true,
        },
      });
    }),
  createChannel: publicProcedure
    .input(z.object({ name: z.string(), serverId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.channel.create({
        data: {
          name: input.name,
          server: {
            connect: {
              id: input.serverId,
            },
          },
        },
      });
    }),
  getChannel: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.channel.findUnique({
        where: {
          id: input.id,
        },
        include: {
          messages: true,
        },
      });
    }),
  createMessage: publicProcedure
    .input(
      z.object({
        content: z.string(),
        channelId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.message.create({
        data: {
          content: input.content,
          channel: {
            connect: {
              id: input.channelId,
            },
          },
          author: {
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      });
    }),
});
