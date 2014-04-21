var express = require('express');
var app = express();
var compression = require('compression');

app.use(compression());
app.use(express.static(__dirname + '/src'));

app.listen(3000);
