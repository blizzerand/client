 var prompt = require('prompt');
 var request = require('requestify');
 var io = require('socket.io-client');
 var five = require("johnny-five");
 var raspi = require('raspi-io');
var board = new five.Board({
  io: new raspi()
});

 var count =0;
var authCode :string;
var email: string;
var password:string;

var server='http://ec2-54-145-228-191.compute-1.amazonaws.com:8080';

console.log("Welcome to the home automation initialization setup") ;   
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
  
    
    if(result) {
     var   authCode = result.authCode;
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

 // function websocketCreate() {




function websocketCreate() {

var socket = io('http://ec2-54-145-228-191.compute-1.amazonaws.com:8080').connect();
  socket.on('message', function(data){
    console.log(data);
    let id = data.id;
    let status = data.status;
    console.log(status);
    if (status ==1)
      switchItOn(id);


    else
      switchItOff(id);


  });

function switchItOn(id) {
  board.on("ready", function() {

  var relays = new five.Relays([3, 4, 5]);

if(id==1) {
  relays[0].close();
  console.log("here");
}
else if(id==2) {
  relays[1].close();
}
  else if(id==3){
    relays[2].close();
  }
})
}




function switchItOn(id) {
 board.on("ready", function() {

var relays = new five.Relays([3, 4, 5]);

  if(id==1) {
    console.log("Here");
  relays[0].open();
}
else if(id==2) {
  relays[1].open();
}
  else if(id==3){
    relays[2].open();
  }
});
}



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


