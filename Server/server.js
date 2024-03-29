const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT || 3000;
const { connectToDB,
  disconnectFromDB,
  isConnected } = require('./db');
const routes = require('./routes');

connectToDB();


const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  res.send('pong');
  console.log({"connectionstatus": isConnected()});
  res.json({"connectionstatus": isConnected()});
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(` server running on PORT: ${port}`);
  });
}

app.use('/', routes);

module.exports = app;