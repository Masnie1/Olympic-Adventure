"use script";

const express = require('express');
const path = require('path');

const app = express();
let mustache = require('mustache-express');

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.static('script'));
app.use('/models', express.static(path.join(__dirname, 'script/models')));

app.get("/", (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('listening on http://localhost:3000'));
