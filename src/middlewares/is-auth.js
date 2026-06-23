export function isAuth(request, reply, done) {
  const { authorization } = request.headers;

  // mock, just to undestand how to use middlewares
  if (authorization !== "token") {
    reply.status(403).send({ message: "Unauthorized" });
  }

  done();
}
