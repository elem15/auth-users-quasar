const
  express = require('express'),
  serveStatic = require('serve-static'),
  port = process.env.PORT || 5000;

const app = express();

app.use(serveStatic('./dist'));
app.listen(port, () => {
  console.log('sever listen on port: ', port);
});
