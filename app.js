var express = require('express');
var config = require('./config');
var app = express();

app
    .use(require('body-parser').urlencoded({ extended: false }))
    .use(require('body-parser').json());

if (process.env.NODE_ENV == 'production'){
    app
        .use(express.static(__dirname + '/mg-main-prod'))
        .listen(config.get('port_prod'), function(){
            console.log('Instance running on port ', config.get('port_prod'));
        });
} else {
    app
        .use(require('morgan')('dev'))
        .use(express.static(__dirname + '/mg-main'))
        .listen(config.get('port_dev'), function(){
            console.log('Instance running on port ', config.get('port_dev'));
        });

}
