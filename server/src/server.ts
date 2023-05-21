import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { memoriesRoutes } from './routes/memories.routes';

const app = fastify();

app.register(memoriesRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running on port 3333');
  })
  .catch((error) => console.log(error));
