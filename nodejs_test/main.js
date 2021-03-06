const cluster = require('cluster');
const express = require('express');
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
  var app = express()
  app.get('/',(req,res)=>{
    console.log('execute worker pid is '+process.pid)
    res.send('execute worker pid is '+process.pid)
  })

  var server = app.listen(SERVER_PORT,()=>{
    var host = '192.168.1.146'
    var port = server.address().port

    console.log(`app listening at http://${host}:${port}`)
  })

  console.log(`Worker ${process.pid} started`);
}