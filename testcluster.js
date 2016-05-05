const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  function handleWorker(worker, code, signal) {
    console.log('worker ${worker.process.pid} died');
  }

  cluster.on('exit', handleWorker);
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server

  console.log('in worker')
  function handleRequest(req, res) {
    res.writeHead(200);
    res.end('hello world\n');
  }

  http.createServer(handleRequest).listen(8000);
}