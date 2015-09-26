var exec = require('child_process').exec;
var branch = 'develop';
var repo = 'mg-main';

module.exports = function (data) {

	if (data.repository.name !== repo || data.ref.split('/')[2] !== branch) { 
		return;
	}

	console.log('New push to ' + data.ref + ' by ' + data.pusher.name + ' (' + data.pusher.email + ')');
    exec([
			'cd /var/www/mg-main/current/',
			'git fetch',
			'git checkout develop',
			'git pull',
			'rm -R node_modules',
			'rm -R bower_components',
			'npm cache clean',
			'npm install',
			'bower cache clean',
			'bower install --config.cwd=./static/',
			'pm2 startOrRestart ecosystem.json develop'
		].join('&&'), function (error, stdout, stderr) {
			error && console.log(error);
		}
	);

}