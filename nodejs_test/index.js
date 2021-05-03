const cluster = require('cluster');
const net = require('net');
const numCPUs = require('os').cpus().length;
var SERVER_PORT = 8000

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  // for (let i = 0; i < numCPUs; i++) {
  //   cluster.fork();
  // }

  cluster.fork()

  cluster.on('fork',(worker)=>{
      console.log(worker.id);
  });

  cluster.on('listening',(worker,address)=>{
      console.log(worker.process.pid+" is now connected to "+ address.address + " : "+address.port);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
  
} else {

  var server = net.createServer((socket,SERVER_PORT)=>{
    var host = '127.0.0.1'
    var port = server.address().port

    console.log('클라이언트 접속')
    socket.write('welcome to socket server')
    socket.on('data', function(chunk) {
        console.log('클라이언트가 보냄 : ',
        chunk.toString());
    });

    socket.on('end', function() {
        console.log('클라이언트 접속 종료');
    });

    server.on('listening', function() {
        console.log('Server is listening');
    });

    server.on('close', function() {
        console.log('Server closed');
    });

    server.listen(port);

    console.log(`app listening at http://${host}:${port}`)
  })

  console.log(`Worker ${process.pid} started`);
}