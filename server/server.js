const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);
const path = require('path');
const authenticatePassport = require('./library/passport');
const db = require('./models')
const routes = require('./routes');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ "extended" : false }));
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

// app.get('/', (req, res) => {
//   res.json('Hello world!');
// });

app.listen(PORT, () => {
  db.sequelize.sync({ force: false });
  console.log(`Server listening on port ${PORT}`);
});