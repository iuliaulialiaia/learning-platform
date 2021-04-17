const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const {routes} = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use(express.json());

app.use('/', routes);

app.use((err, req, res, next) => {
  if (err) {
    // TODO trimite erori custom
    console.error(err.stack);
    res.status(500).send(err.message);
  }
});

const port = parseInt(process.env.PORT);
app.listen(port, () => {
  console.log(`App is listening at ${process.env.BASE_URL}:${port}`);
});