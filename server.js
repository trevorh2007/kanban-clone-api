require('dotenv').config()
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
const cors = require('cors')

app.use(cors())
app.use(express.json())

const tasksRouter = require('./routes/tasks')
app.use('/api/tasks', tasksRouter)

app.get('/', (req, res) => {
    res.status(200).send("App running.")
})

app.listen(port, function () {
    console.log('Server started on port: ' + port);
});