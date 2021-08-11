const app = require('./src');
const config = require('config');

const PORT = config.get('server.port');

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});