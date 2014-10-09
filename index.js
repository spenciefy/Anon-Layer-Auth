// Requires
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var fs = require('fs');
var r = require('jsrsasign');

// Layer Vars
var layerProviderID = 'ebe40df2-19c1-11e4-a04f-a19800003b1a';
var layerKeyID = '99d1bb30-4f5a-11e4-8f96-3a2a000000e6';
var privateKey = fs.readFileSync('keys/layerkey.pem');

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.post('/authenticate', function(req, res){

    var header =  JSON.stringify({
      typ: "JWS", // Expresses a MIMEType of application/JWS
      alg: "RS256", // Expresses the type of algorithm used to sign the token, must be RS256
      cty: "layer-eit;v=1", // Express a Content Type of application/layer-eit;v=1
      kid: layerKeyID,
    });

    var currentTimeInSeconds = Math.round(new Date() / 1000);
    var expirationTime = currentTimeInSeconds + 10000;

    var claim = JSON.stringify({
      iss: layerProviderID, // The Layer Provider ID
      prn: req.body.userid, // User Identifier
      iat: currentTimeInSeconds, // Integer Time of Token Issuance 
      exp: expirationTime, // Integer Arbitrary time of Token Expiration
      nce: req.body.nonce, //Nonce obtained from the Layer Client SDK
    });
    console.log("claim" + JSON.stringify(claim) + "private key:" + privateKey.toString());

    console.log(new r.Signature());

    var jws = r.jws.JWS.sign('RS256', header, claim, privateKey.toString());

    console.log("jws" + jws);

     res.json({'identityToken': jws})

 });

app.get('/', function(request, response) {
  response.send('this should work')
})

var server = app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

