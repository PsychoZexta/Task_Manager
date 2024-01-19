const express = require('express');
const app = express();
let tasks = require('./Routes/tasks')
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler')
require('dotenv').config()

//Middleware
app.use(express.urlencoded(({ extended: false })))

app.use(express.json())

//static assests
app.use(express.static('./public'));

app.use('/api/v1/tasks', tasks)

app.use(errorHandler)

app.use(notFound)


const port = 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => { console.log(`Listening on port ${port}`); })
    } catch (err) {
        console.log(err)
    }
}


start();