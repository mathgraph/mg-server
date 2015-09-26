var express = require('express');
var port = +process.env.WEBHOOK_PORT || 8888;

var app = express();

app
	.use(require('body-parser').json({
		verify: function (req, res, buf) {
			req.rawBodyBuffer = buf;
		}
	}))
	.use('/github', require('./listeners/github'))
	.use('/trello', require('./listeners/trello'))
	.listen(port);

console.log('Instance running on port ' + port + '...');