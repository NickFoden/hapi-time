const Path = require("path");

module.exports = {
  server: {
    // cache: "redis",
    port: 8000,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "public")
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: require("@hapi/inert")
      },
      {
        plugin: "vision",
        options: {
          engines: {
            html: require("handlebars")
          },
          path: __dirname
        }
      },
      {
        plugin: require("./home")
      },
      {
        plugin: require("./employee")
      },
      {
        plugin: require("./manager")
      }
    ]
  }
};
