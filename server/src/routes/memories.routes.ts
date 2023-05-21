import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prismaClient } from '../lib/prisma';

export async function memoriesRoutes(app: FastifyInstance) {
  app.post('/memories', async () => {});

  app.get('/memories', async () => {
    const memories = await prismaClient.memory.findMany({
      orderBy: {
        create_at: 'asc',
      },
    });

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.cover_url,
        excerpt: memory.content.substring(0, 115).concat('...'),
      };
    });
  });

  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const memory = await prismaClient.memory.findUniqueOrThrow({
      where: { id },
    });

    return memory;
  });

  app.put('/memories/:id', async () => {});

  app.delete('/memories/:id', async () => {});
}
