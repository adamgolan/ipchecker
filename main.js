var http = require('https');
require('isomorphic-fetch');
var config = require('./config');
var Dropbox = require('dropbox').Dropbox;

http.get('https://api.ipify.org?format=json', function (resp) {
    var data = '';
    resp.on('data', function (chunk) {
        data += chunk;
    });
    resp.on('end', function () {
        var dbx = new Dropbox({ 
            accessToken: config.token
        });
        console.log(JSON.parse(data));
        dbx.filesUpload({ path: '/' + 'ip.txt', contents: '' + new Date() + ': ' + JSON.parse(data).ip, mode: { ".tag": 'overwrite'} });
    });
}).on("error", function (e) {
    console.log("Got error: " + e.message);
});