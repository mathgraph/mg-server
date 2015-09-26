var crypto = require('crypto');
var secret = process.env.WEBHOOK_GITHUB_SECRET;

var restartEcosystem = require('../helpers/github-restart-ecosystem');
var commits = require('../helpers/github-commits');

function verify(request, body, secret) {
	var hmac = crypto.createHmac('sha1', secret).update(body);
	var signature = 'sha1=' + hmac.digest('hex');
	return signature === req.headers['x-hub-signature'];
}

module.exports = function (req, res, next) {

	if (!verify(req, req.rawBodyBuffer || '', secret)) {
		res.status(200).send('No');
		return;
	}

	restartEcosystem(req.body);
	commits(req.body);

	res.status(200).send();
};