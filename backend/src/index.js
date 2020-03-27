const express = require('express');
const routes = require('./routes');

const app = express();

// advise for express to use json format before each request
app.use(express.json());

app.use(routes);

app.listen(3333, () => {
    console.log('Hello word!');
});