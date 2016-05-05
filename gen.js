function asyn() {
  var p = new Promise(function(resolve, reject){
    console.log("async function is running")
    // This is some asynchronous operation that is being run.
    setTimeout(function() {
      console.log("Async Operation is completed")
      resolve(10)
    }, 3000);
  });
  return p;
}
function* gen() {
  console.log("Generator started");
  var x = yield asyn();
  console.log(x);
  return x;
}
/*
var y = gen();
var myProm = y.next();
console.log("A promise is yielded");
myProm.value.then(function(result) {
  console.log(y.next(result));
}, function(err) {

});
  */

function runGenerator(g) {
  console.log("In runGenerator");
  var it = g(), ret;

  console.log("after first yield");
  // asynchronously iterate over generator
  (function iterate(val){
    ret = it.next( val );

    if (!ret.done) {
      // poor man's "is it a promise?" test
      if ("then" in ret.value) {
        // wait on the promise
        ret.value.then( iterate );
      }
      // immediate value: just send right back in
      else {
        // avoid synchronous recursion
        setTimeout( function(){
          iterate( ret.value );
        }, 0 );
      }
    }
  })();
}

runGenerator(gen);