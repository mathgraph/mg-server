var Trello = require('node-trello');

var key = 'c3c747f69e1c727e1cc904f87cb798aa';
var secret = 'd49fe0aaa39a681ccbcc5f2c9e55c5c40465016189dbe833d0170af005ec8391';
var token = 'd72434c2e43ccc5295d8f940c10a69235e34c7afe2003090f78075f32e34b265';

var t = new Trello(key, token);

t.get('1/boards/55f421e8c949342a90a32c9b/cards', function (err, data) {
    data.forEach(function (card) {
        t.put('1/cards/' + card.id, { name: '[' + card.idShort + '] ' + card.name }, function (err, respose) {
            console.log(err || respose);
        });
    });

});

