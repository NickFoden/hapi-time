"use strict";

const Joi = require("@hapi/joi");

exports.register = (server, options) => {
  server.route({
    method: "POST",
    path: "/shift",
    config: {
      validate: {
        payload: Joi.object({
          start: Joi.date()
            .iso()
            .max("now")
            .required(),
          end: Joi.date()
            .iso()
            .min(Joi.ref("start"))
            .max("now")
            .required()
        })
      }
    },
    handler: (request, h) => {
      return request.payload;
    }
  });
};

exports.pkg = {
  name: "employee"
};
