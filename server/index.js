const express = require('express')
const cors = require('cors')
const { google } = require('googleapis')
const splitString = require('./logic')
const path = require('path')

app.use(cors())
// const auth = new google.auth.GoogleAuth({
//     keyFile: "credentials.json",
//     scopes: "https://www.googleapis.com/auth/spreadsheets",
// });

const app = express()
app.use(express.static('public'))
app.use(express.json())

const port = 3000

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post('/', urlencodedParser, async function (request, response) {
    if (!request.body) return response.sendStatus(400);
    // console.log(request.body);
    response.send('Создание сводной завершено')

})

app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`)
})
