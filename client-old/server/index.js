const { server, checkToken } = require('./server');

const PORT = process.env.PORT || 8080;

server.listen(PORT, checkToken(null, null, () => {
}));