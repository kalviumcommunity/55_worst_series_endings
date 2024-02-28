const express = require('express');
const app = express();
const port = 3000;
const { connect, disconnect, isconnected, connectToDB } = require('./db');

connectToDB();

// define the ping route
app.get('/', (req, res) => {
  res.send('pong');
  console.log({"connectionstatus": isconnected()});
  res.json({"connectionstatus": isconnected()});
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(` server running on PORT: ${port}`);
  });
}

module.exports = app;