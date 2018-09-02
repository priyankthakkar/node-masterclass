const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Extract http method
    const method = req.method.toUpperCase(); 

    // Extract query string parameters
    const parameters = parsedUrl.query;

    // Log the path
    console.log(`Requested path is: ${trimmedPath} with method: ${method} and with parameters`, parameters);

    // Send response
    return res.end('Hello World');
});

server.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});