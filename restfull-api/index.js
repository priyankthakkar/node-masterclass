const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

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

    // Extract payload from request
    let buffer = '';
    const decoder = new StringDecoder('utf-8');

    req.on('data', data => {
        buffer = buffer + decoder.write(data);
    });

    req.on('end', () => {
        buffer = buffer + decoder.end();

        // Choose the request handler
        const chosenHandler = router[trimmedPath] ? router[trimmedPath] : handlers.notFound;

        // Form data for handler
        const data = {
            method: method,
            uri: trimmedPath,
            queryString: parameters,
            headers: headers,
            payload: buffer
        };

        // Pass data to handler, define callback
        chosenHandler(data, (statusCode, response) => {
            // set status code, default is 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            // set response, default is an empty object
            response = typeof(response) === 'object' ? response : {};
            const responseJson = JSON.stringify(response);

            // write status code
            res.writeHead(statusCode);

            // finish request
            res.end(responseJson);
        });

        // Send response
        return res.end('Hello World');
    });
});

const handlers = {};

handlers.sample = (data, callback) => {
    console.log('Sample handler is processing: ', data);
    callback(200, { message: 'Data processed successfully.'});
}

handlers.notFound = (data, callback) => {
    callback(404);
}

// Define a request router
const router = {
    'sample': handlers.sample
};

server.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});