const service = require("./service");

exports.register = async server => {
  await server.register(require("@hapi/bell"));
  await server.register(require("@hapi/basic"));
  await server.register(require("@hapi/cookie"));

  server.auth.strategy("simple", "basic", { validate: service.validate });

  server.auth.strategy("azure", "bell", {
    provider: "azure-legacy",
    password: "cookie_encryption_password_secure",
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    config: {
      tenant: process.env.tenant
    },
    isSecure: false
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "timeclock",
      password: "password-should-be-32-characters",
      isSecure: false
    },
    appendNext: true,
    redirectTo: "/"
  });

  server.route({
    method: "GET",
    path: "/azure/login",
    options: {
      auth: "azure",
      handler: function(request, h) {
        if (!request.auth.isAuthenticated) {
          return `Authentication failed due to: ${request.auth.error.message}`;
        }

        request.cookieAuth.set({
          username: request.auth.credentials.profile.email
        });

        const next = request.auth.credentials.query.next
          ? request.auth.credentials.query.next
          : "/home";

        return h.redirect(next);
      }
    }
  });

  server.route({
    method: "GET",
    path: "/logout",
    config: {
      auth: "session"
    },
    handler: function(request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    }
  });
};

exports.pkg = {
  name: "auth"
};
