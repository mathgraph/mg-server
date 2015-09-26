var comment = require('./trello-create-comment');
var pattern = /^\[(\d+)\]/;

module.exports = function (data) {
	data.commits.forEach(function (commit) {
		var tmp = pattern.exec(commit.message);
		tmp && comment(+tmp[1], commit.message + ':\n' + commit.url);
	});
};