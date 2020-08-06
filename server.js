const express = require('express');
const cors = require('cors');
const sql = require('./sql');

const app = express();
const corsOption = {
    origin: ['http://localhost:4000', 'http://localhost:4200'],
};

app.use(cors(corsOption));
app.use(express.json());

app.get('/', function (req, res) {
    res.send('v1');
});

require('./projects')(app, sql);

app.listen(8000, function () {
    console.log('server is listening');
    sql.init();
});
