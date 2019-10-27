const users = {
  john: {
    username: "john",
    password: "changeme",
    name: "John Doe",
    id: "2133d32a"
  },
  client2: {
    username: "client2",
    password: "changeme",
    name: "The Client 2",
    id: "2133d32b"
  }
};

module.exports.validate = async (request, username, password, h) => {
  const user = users[username];
  if (!user) {
    console.log("no user ", request);
    return { credentials: null, isValid: false };
  }

  const isValid = password === user.password;
  const credentials = { id: user.id, username: user.username };
  console.log("valid " + valid + " request " + request);
  return { isValid, credentials };
};
