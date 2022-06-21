import { Server, Model, RestSerializer } from "miragejs";

import {
  loginHandler,
  signupHandler,
  userProfilehandler,
} from "./backend/controllers/AuthController";

import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      user: Model,
      notes: Model,
    },

    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          notes: [],
          archives: [],
          trash: [],
        })
      );
    },

    routes() {
      this.namespace = "api";

      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // user route (private)
      this.get("/user", userProfilehandler.bind(this));
    },
  });
  return server;
}
