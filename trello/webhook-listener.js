var crypto = require('crypto');

function verifyTrelloWebhookRequest(request, secret, callbackURL) {
    // Double-HMAC to blind any timing channel attacks
    // https://www.isecpartners.com/blog/2011/february/double-hmac-verification.asp
    var base64Digest = function (s) {
        return crypto.createHmac('sha1', secret).update(s).digest('base64');
    };
    var content = request.body + callbackURL;
    var doubleHash = base64Digest(base64Digest(content));
    var headerHash = base64Digest(request.headers['x-trello-webhook']);
    return doubleHash == headerHash;
}

