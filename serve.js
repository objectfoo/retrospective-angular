var express = require('express');
var app = express();
var compression = require('compression');

app.use(compression());
app.use(express.static(__dirname + '/dist'));

app.listen(3000);
