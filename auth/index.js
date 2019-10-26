const service = require("./service");

exports.register = async server => {
  await server.register(require("@hapi/basic"));

  server.auth.strategy("simple", "basic", { validate: service.validate });
};

exports.pkg = {
  name: "auth"
};
