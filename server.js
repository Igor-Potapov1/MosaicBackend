const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8080;
const corsProps = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsProps));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

require('./routes/auth')(app);
require('./routes/pages')(app);

app.get('/', (req, res) => {
  res.json({message: 'Server is up'});
});

app.listen(PORT, () => {
  console.log(`Server port is ${PORT}`);
});
