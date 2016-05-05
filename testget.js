var http = require('http'),
  https = require('https');

var co = require('co');

function http_get(url) {
  console.log(url);
  return new Promise(function(resolve, reject) {
    console.log('Before Fetch');
    var req = https.get(url, function(response){
      console.log('Fetching Response');
      var data = '';
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function(){
        resolve(data);
      });

      response.on('error', function(e){
        reject(err);
      });
    });

    req.on('error', function(err){
      reject(err);
    });

  });
}

function http_get_1(url) {
  console.log(url);
    console.log('Before Fetch');
    return https.get(url, function(response){
      console.log('Fetching Response');
      var data = '';
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function(){
        //resolve(data);
      });

      response.on('error', function(e){
        //reject(err);
      });
    });


}


function* gen() {
  var g = yield http_get_1('https://www.google.com');
  //var h = yield http_get_1('https://www.facebook.com');
  return g;
}

co(gen).then(function(result){
  console.log(result);
}, function(err) {
  console.log(err);
})


//var it = gen();
//
//var ps = it.next();
//
//ps.value.then(function(result) {
//  console.log(result);
//  return it.next().value;
//}).then(function(result){
//  console.log(result);
//}).catch(function(error){
//  console.log(error);
//});