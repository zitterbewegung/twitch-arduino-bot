var irc = require('twitch-irc');
var five = require('johnny-five');
board = new five.Board();

var config = require('./conf');
var clientOptions = {
  options: {
    debug: true,
    debugIgnore: ['ping', 'chat', 'action']}
    ,
    identity: {
      username: 'IoTbot',
      password: config.oauth
    },
    channels: ['zitterbewegung']

}

board.on("ready", function() {
    // Create an Led on pin 13
    var led = new five.Led(13);
   
    // Create the client object.
    var client = new irc.client(clientOptions);
    // Initialize the RGB LED
    var colorled = new five.Led.RGB({
      pins: {
        red: 5,
        green: 10,
        blue: 9}});
  
    client.connect();

    client.addListener('chat', function (channel, user, message) {
	console.log(user.username + ': ' + message);
	if (message.toLowerCase() === '!turn-led-on') {
	    client.say(channel, 'Hello, ' + user.username + '!');
	        led.on();
	}
    });
   client.addListener('chat', function (channel, user, message) {
	console.log(user.username + ': ' + message);
	if (message.toLowerCase() === '!turn-led-off') {
	    client.say(channel, 'Hello, ' + user.username + 'led is off'+ '!');
	        led.off();
	}
   });
  client.addListener('chat', function (channel, user, message) {
	console.log(user.username + ': ' + message);
      if (message.toLowerCase().indexOf('!turn-color-led') === 0) {
	    client.say(channel, 'Hello, ' + user.username + 'led is set to color'+ message + '!');
	         // Turn it on and set the initial color
          colorled.on();
	  var color = message.toLowerCase().split(" ")[1];
	  switch(color){
	    case "red":
	      colorled.color('#FF0000');
	      break;
	    case "blue":
	      colorled.color('#0000FF');
	      break;
	      
	  }

          colorled.blink(1000);
   
	}
    });
       
});



