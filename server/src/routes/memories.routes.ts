import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prismaClient } from '../lib/prisma';

export async function memoriesRoutes(app: FastifyInstance) {
  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      is_public: z.coerce.boolean().default(false),
    });

    const { content, coverUrl, is_public } = bodySchema.parse(request.body);

    const memory = await prismaClient.memory.create({
      data: {
        content,
        cover_url: coverUrl,
        is_public,
        user_id: 'd90910fe-e6ff-4f98-a6c5-31bac397f851',
      },
    });

    return memory;
  });

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

  app.put('/memories/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const paramsVerifyZod = paramsSchema.safeParse(request.params);

    if (!paramsVerifyZod.success) {
      return response.status(400).send({ ERROR: 'Invalid ID!' });
    }

    let memoryExists;

    try {
      memoryExists = await prismaClient.memory.findUniqueOrThrow({
        where: { id: paramsVerifyZod.data.id },
      });
    } catch (error) {
      return response.status(404).send({
        ERROR: 'Memory does not exists!',
      });
    }

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      is_public: z.coerce.boolean().default(false),
    });

    const bodyVerifyZod = bodySchema.safeParse(request.body);

    if (!bodyVerifyZod.success) {
      return response.status(400).send({ ERROR: bodyVerifyZod.error.errors });
    }

    const memoryUpdated = await prismaClient.memory.update({
      where: { id: paramsVerifyZod.data.id },
      data: {
        content: bodyVerifyZod.data.content,
        cover_url: bodyVerifyZod.data.coverUrl,
        is_public: bodyVerifyZod.data.is_public,
      },
    });

    return memoryUpdated;
  });

  app.delete('/memories/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const zodVerification = paramsSchema.safeParse(request.params);

    if (!zodVerification.success) {
      return response.status(400).send({ ERROR: 'Invalid ID!' });
    }

    try {
      await prismaClient.memory.findUniqueOrThrow({
        where: { id: zodVerification.data.id },
      });

      await prismaClient.memory.delete({
        where: { id: zodVerification.data.id },
      });
    } catch (error: any) {
      return response.status(404).send({
        ERROR: 'Memory does not exists!',
      });
    }
  });
}
