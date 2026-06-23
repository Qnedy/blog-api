import { isAuth } from "../middlewares/is-auth.js";

const posts = [];

// create the routes here, to use in server main file, injecting app instance
export async function postsRoutes(app) {
  app.get(
    "/posts",
    {
      onRequest: [isAuth],
    },
    (request, reply) => {
      return reply.status(200).send(posts);
    },
  );

  app.post("/posts", { onRequest: [isAuth] }, (request, reply) => {
    const { username, title, content } = request.body;

    const newPost = {
      id: posts.length + 1,
      owner: username,
      title,
      content,
      date: new Date().toISOString(),
      comments: [],
      likes: [],
    };

    posts.push(newPost);

    return reply.status(201).send(posts);
  });

  app.post("/posts/:id/comment", { onRequest: [isAuth] }, (request, reply) => {
    const { id } = request.params;

    const { username, content } = request.body;

    const postIndex = posts.findIndex((post) => post.id === Number(id));

    if (postIndex === -1) {
      return reply.status(404).send({ message: "Post not found." });
    }

    const comment = {
      owner: username,
      date: new Date().toISOString(),
      content,
    };

    posts[postIndex].comments.push(comment);

    return reply.status(204).send(posts);
  });
}
