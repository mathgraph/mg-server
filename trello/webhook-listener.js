var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');

var Trello = require('node-trello');
var key = 'c3c747f69e1c727e1cc904f87cb798aa';
var secret = 'd49fe0aaa39a681ccbcc5f2c9e55c5c40465016189dbe833d0170af005ec8391';
var token = 'd72434c2e43ccc5295d8f940c10a69235e34c7afe2003090f78075f32e34b265';
var trello = new Trello(key, token);
var callbackURL = 'http://188.166.85.160:8888';

function verifyTrelloWebhookRequest(request, body, secret, callbackURL) {
    // Double-HMAC to blind any timing channel attacks
    // https://www.isecpartners.com/blog/2011/february/double-hmac-verification.asp
    var base64Digest = function (s) {
        return crypto.createHmac('sha1', secret).update(s).digest('base64');
    };
    var content = body + callbackURL;
    var doubleHash = base64Digest(base64Digest(content));
    var headerHash = base64Digest(request.headers['x-trello-webhook']);
    return doubleHash == headerHash;
}

var app = express();

app	
	.use(bodyParser.json({ 
		verify: function (req, res, buf) { 
			req.rawBodyBuffer = buf;
		}
	}))
	.use(function (req, res) {
		if (!verifyTrelloWebhookRequest(req, req.rawBodyBuffer, secret, callbackURL)) {
			res.status(404).send();
			return;
		}
		if (req.body.action.type === 'createCard') {
			var card = req.body.action.data.card;
			trello.put('1/cards/' + card.id, { name: '[' + card.idShort + '] ' + card.name }, function (err, respose) {
            	console.log(err || respose);
        	});
		}
		res.status(200).send();
	})
	.listen(8888);

console.log('Running on port 8888...');
