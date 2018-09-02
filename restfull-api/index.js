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

    // Extract headers
    const headers = req.headers;

    // Log the path
    console.log(`Requested path is: ${trimmedPath} with method: ${method} and with parameters`, parameters);

    // Log headers
    console.log(`Headers sent with request are: `, headers);

    // Send response
    return res.end('Hello World');
});

server.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});