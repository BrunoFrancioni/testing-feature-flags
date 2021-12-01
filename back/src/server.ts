const http = require('http');
import app from "./app";

const port = 8080;
const host = '127.0.0.1';

const server = http.createServer(app);

server.listen(port, Number(host), () => {
    console.log('Server is working');
});