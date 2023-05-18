import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const app = fastify();
const prisma = new PrismaClient();

app.get('/hello', () => {
  return 'hello world!';
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server running on port 3333');
  })
  .catch((error) => console.log(error));
