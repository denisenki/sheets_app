const express = require('express')
const cors = require('cors')
const { google } = require('googleapis')
const splitString = require('./logic')
const path = require('path')

app.use(cors())

const app = express()
app.use(express.static('public'))
app.use(express.json())

const port = 3000

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post('/create', urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/index2.html");

})

app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`)
})
