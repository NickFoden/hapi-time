exports.register = (server, options) => {
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.view("manager/list.html", {});
    }
  });
};

exports.pkg = {
  name: "manager"
};
