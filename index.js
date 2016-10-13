const co = require('co');
const fetch = require('node-fetch');

co(function* () {
  const res = yield fetch('https://github.com/Financial-Times/email-automated-scheduler/blob/49ddf0276022b1592d61bdc050195466d46dc7ea/index.html');
  const html = yield res.text(); 
  console.log(html);
}).catch(console.log);
