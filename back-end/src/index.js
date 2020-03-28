const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors()); // it's used to allow only a specific frontend application to use it
app.use(express.json()); // advise for express to use json format before each request
app.use(routes);

app.listen(3333, () => {
    console.log('Hello word!');
});