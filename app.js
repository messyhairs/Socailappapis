const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
const databbase = require('./db/db');
const userRoutes = require('./Routes/user');
const header_middleware = require("./middleware/header");
app.use(express.json())
app.use(header_middleware)
app.get('/apitest', function (request, response) {
    response.send('Hello this SOCAIL APP api');
})
app.use('/api', userRoutes)
app.listen(PORT, (req, res) => {
    console.log(`app is listening on check now ${PORT}`);
})