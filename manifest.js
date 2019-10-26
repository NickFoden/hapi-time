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
        plugin: "@hapi/vision",
        options: {
          engines: {
            html: require("handlebars")
          },
          path: __dirname,
          layout: true,
          layoutPath: "templates/layouts"
        }
      },
      {
        plugin: require("./home")
      },
      {
        plugin: require("./manager"),
        routes: {
          prefix: "/manager"
        }
      },
      {
        plugin: require("./employee"),
        routes: {
          prefix: "/employee"
        }
      }
    ]
  }
};
