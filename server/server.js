const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);
const path = require('path');
const passport = require('passport');
const db = require('./models')
const routes = require('./routes');

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

app.use(session({
  store: new redis(),
  secret: 'Shade',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json('Hello world!');
});

app.listen(PORT, () => {
  db.sequelize.sync({ force: false });
  console.log(`Server listening on port ${PORT}`);
});