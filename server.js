require('dotenv').config()
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.json())

const tasksRouter = require('./routes/tasks')
app.use('/api/tasks', tasksRouter)

app.listen(port, function () {
    console.log('Server started on port: ' + port);
});