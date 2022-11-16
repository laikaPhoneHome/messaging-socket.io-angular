const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
http.listen(3000, () => {
    console.log('Listening on port 3000')
})