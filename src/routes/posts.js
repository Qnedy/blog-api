const posts = [{ content: "s" }];

// create the routes here, to use in server main file, injecting app instance
export async function postsRoutes(app) {
  app.get("/posts", (request, reply) => {
    return reply.status(200).send(posts);
  });
}
