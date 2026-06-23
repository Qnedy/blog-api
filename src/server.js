import fastify from "fastify";
import { postsRoutes } from "./routes/posts.js";

const app = fastify({
  // posso usar somente logger: true pra ter logs padroes, mas posso usar pino-pretty pra
  // ter logs mais estruturados no formato abaixo
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

app.register(postsRoutes);

app.listen({
  // é bom deixar zerado principalmente por problemas de achar localhost via docker
  host: "0.0.0.0",
  port: 4000,
});
