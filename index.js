// Requires
var express = require('express');
var app = express();
var redis = require('redis');
var db = redis.createClient();
var bodyParser = require('body-parser')
var fs = require('fs')
var r = require('jsrsasign');

// Layer Vars
var layerProviderID = 'ebe40df2-19c1-11e4-a04f-a19800003b1a';
var layerKeyID = 'f5a06916-4d9d-11e4-bfbd-c770000045cb';
var privateKey = fs.readFileSync('keys/layerkey.pem');

app.use(bodyParser());

app.post('/authenticate', function(req, res){

    // var header =  JSON.stringify({
    //   typ: "JWS", // Expresses a MIMEType of application/JWS
    //   alg: "RS256", // Expresses the type of algorithm used to sign the token, must be RS256
    //   cty: "layer-eit;v=1", // Express a Content Type of application/layer-eit;v=1
    //   kid: layerKeyID,
    // });

    // var currentTimeInSeconds = Math.round(new Date() / 1000);
    // var expirationTime = currentTimeInSeconds + 10000;

    // var claim = JSON.stringify({
    //   iss: layerProviderID, // The Layer Provider ID
    //   prn: req.body.userID, // User Identifier
    //   iat: currentTimeInSeconds, // Integer Time of Token Issuance 
    //   exp: expirationTime, // Integer Arbitrary time of Token Expiration
    //   nce: req.body.nonce, //Nonce obtained from the Layer Client SDK
    // });

    // console.log(new r.Signature());

    // var jws = r.jws.JWS.sign('RS256', header, claim, privateKey.toString());

    res.json({'identityToken': 'aaksldjfa3lkjfslkdjf'})

});

app.get('/', function (req, res) {
  res.send('Anon layer identity token generator (do i even know how to do this)');
});

// var server = app.listen(3000, function() {

//     console.log('Listening on port %d', server.address().port);

// });