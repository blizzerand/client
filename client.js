 var prompt = require('prompt');
 var request = require('requestify');
 var io = require('socket.io-client');
 var count =0;
/*var authCode,email,password;

var server='http://localhost:8080';

console.log("Welcome to the automation initialization setup") ;   
console.log("Alright. Now your credentials so we could log you in.");
    

  var properties = [
    {
        name: 'authCode'
    },

    {
      name: 'email', 
     
    },
    {
      name: 'password',
      hidden: true
    }
  ];
  

  prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    
    if(result) {
        authCode = result.authCode;
        email = result.email;
        password = result.password;
        
       request.post(`${server}/a/d_signin`, {
        authCode: authCode,
        email : email,
        password: password
    })
    .then(function(response) {
        // Get the response body
        console.log("Helo");
        if(response)
            websocketCreate();
        else
            console.log("Failed");
    });
    }
  });
*/
 // function websocketCreate() {

var socket = io('http://localhost:8080/').connect();

socket.on('message', function(data){
    console.log(data.message);
});
 /* socket.on('Helloworld', function(response) {
    console.log(response);
  })

     // otherwise the node process keeps on running.
 
/*  socket.on('auto', function(response) {
    console.log(response.message);
  })
*/
  

 /* setInterval(() => {
    socket.emit('message', count);
    count = count +1;
}, 1000);*/
  


//  }

  function onErr(err) {
    console.log(err);
    return 1;
  }


