#!/usr/bin/env node

var express = require('express');
var crypto = require('crypto');
var exec = require('child_process').exec;
var app = express();
var branch = process.env.GITHUB_WEBHOOK_BRANCH || 'develop';

app.use(require('body-parser').json());

app.post('/', function(req, res) {
    var reqBody = req.body;
    console.log('New push to ' + reqBody.ref + ' by ' + reqBody.pusher.name + ' (' + reqBody.pusher.email + ')');
    if (reqBody.ref === 'refs/heads/' + branch) {
        // https://developer.github.com/webhooks/securing/
        var hmac = crypto.createHmac('sha1', process.env.GITHUB_WEBHOOK_SECRET);
        // http://stackoverflow.com/questions/12195480/node-js-crypto-cannot-create-hmac-on-chars-with-accents
        // http://stackoverflow.com/questions/9463157/nodejs-hmac-digest-issue-with-accents
        hmac.update(new Buffer(JSON.stringify(reqBody)));
        var signature = 'sha1=' + hmac.digest('hex');
        if (signature !== req.headers['x-hub-signature']) {
            console.log('Signatures didn\'t match!');
            return res.status(500).send('Signatures didn\'t match!')
        } else {
            console.log('Execute hook.sh');
            exec(__dirname + '/hook.sh ' + branch, function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        }
    } else
        console.log('Do nothing');
    return res.sendStatus(200);
});

var server = app.listen(3456, function(){
    console.log('Github webhook listener on port %s', server.address().port);
});
