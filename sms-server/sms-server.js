var config = require('./config.json')
var twilio_restclient = require('twilio')(config.twilio.live.account_sid, config.twilio.live.auth_token)
var twilio = require('twilio'),
    http = require('http');

function sendSms(number, text) {
	twilio_restclient.sendSms({
	    to: number,
	    from: config.twilio.number,
	    body: text
	}, function(error, message) {
	    if (!error) {
	        console.log('Success! The SID for this SMS message is:');
	        console.log(message.sid);
	        console.log('Message sent on:');
	        console.log(message.dateCreated);
	    } else {
	        raise new Error(error)
	    }
	});
}
 
// Create an HTTP server, listening on port 1337, that
// will respond with a TwiML XML document
http.createServer(function (req, res) {
	console.log(req)

    // Create a TwiML response
    var twimlresp = new twilio.TwimlResponse();
 
    // The TwiML response object will have functions on it that correspond
    // to TwiML "verbs" and "nouns". This example uses the "Say" verb.
    // Passing in a string argument sets the content of the XML tag.
    // Passing in an object literal sets attributes on the XML tag.
    twimlresp.say({voice:'woman'}, 'ahoy hoy! Testing Twilio and node.js');
 
    //Render the TwiML document using "toString"
    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(resp.toString());
 
}).listen(1337);
 
console.log('Visit http://localhost:1337/ in your browser to see your TwiML document!');
