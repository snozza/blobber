require('dotenv').config({ silent: true });

const co = require('co');
const fetch = require('node-fetch');
const fs = require('fs');
const config = require('./config');

let current = fs.readFileSync('./example.html');
current = current.toString('base64');

co(function* () {
  const fileRes = yield fetch('https://api.github.com/repos/snozza/blobber/contents/example.html');
  if (fileRes.ok) {
    const file = yield fileRes.json(); 
    if (file.content.replace(/\n/g, '') === current) { 
      console.log('equal');
    } else {
      const updateOptions = {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: config.gitAuth,
        },
        body: JSON.stringify({
          content: current,
          message: 'updated',
          sha: file.sha
        })
      };

      const updateRes = yield fetch('https://api.github.com/repos/snozza/blobber/contents/example.html', updateOptions);
      console.log(updateRes.status);
    }
  }
}).catch(console.log);
