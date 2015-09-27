var desc = require('./trello-append-description');
var pattern = /^\[(\d+)\]/;

module.exports = function (data) {
	data.commits.forEach(function (commit) {
		var tmp = pattern.exec(commit.message);
		tmp && desc(+tmp[1], commit.message + '\n' + commit.url + '\n');
	});
};