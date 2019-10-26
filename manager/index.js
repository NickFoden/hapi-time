exports.register = (server, options) => {
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.view("manager/list.html", {
        test: "this is a test",
        moreData: "WHOA MORE DATA"
      });
    }
  });
};

exports.pkg = {
  name: "manager"
};
