var res = Promise.resolve("Mihir");

res.then(function(result) {
  console.log(result);
});



var p = new Promise(function(resolve, reject){
  // This is called as a revealing constructor pattern. The function passed is executed immediately.
  console.log("Executor is executing")
  resolve("resolved")
  // This is some asynchronous operation that is being run.
  //setTimeout(function() {
  //  console.log("Async Operation is completed")
  //  resolve("Resolved")
  //}, 3000);
});

console.log('promise created')
p.then(function(result){
  // the callbacks passed to then are invoked in async manner.
  console.log("Success");
  console.log(result);

  return "Hello Promises"
}, function(error){
  console.log(error);
  console.log("Error");
}).then(function(v) {
  console.log(v);
});

console.log('file end');