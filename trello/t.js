var Trello = require('node-trello');

var key = 'c3c747f69e1c727e1cc904f87cb798aa';
var secret = 'd49fe0aaa39a681ccbcc5f2c9e55c5c40465016189dbe833d0170af005ec8391';
var token = '2713329724dab818edd5c15cabb49ded95e5940991a097f132fcee38667345c8';

var t = new Trello(key, token);

t.get('1/boards/55f421e8c949342a90a32c9b/cards', function (err, data) {
    data.forEach(function (card) {
        t.put('1/cards/' + card.id, { name: '[' + card.idShort + '] ' + card.name }, function (err, respose) {
            console.log(err || respose);
        });
    });

});

