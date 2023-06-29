const express = require('express')
const cors = require('cors')
const { google } = require('googleapis')
const splitString = require('./logic')
const path = require('path')

app.use(cors())
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const app = express()
app.use(express.static('public'))
app.use(express.json())
// app.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });
const port = 3000

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });



let sheet_id = '';
let comma = ',';
let arrSheet = [];
let TargetAudienceSize = '';
// let arrData = []
// let tab = []

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post('/', urlencodedParser, async function (request, response) {
    if (!request.body) return response.sendStatus(400);
    // console.log(request.body);


    // Строчка из формы
    sheet_id = request.body.sheet_id;
    arrSheet = splitString(request.body.tabs, comma);
    TargetAudienceSize = request.body.TargetAudienceSize;
    console.log(`массив вкладок ${arrSheet}`);



    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = sheet_id;

    //Создание первой строчки с аудиторией
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "свод 1!A1:B1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values:
                [['TargetAudience', TargetAudienceSize]]
        },
    });

    // let b = 1;
    for (i = 0; i < arrSheet.length; i++) {
        console.log(arrSheet[i]);
        // Get metadata about spreadsheet
        const metaData = await googleSheets.spreadsheets.get({
            auth,
            spreadsheetId,
        });
        // создаем диапазон
        let range_tmp = `${arrSheet[i]}!A5:AT22`;

        let tab = arrSheet[i]
        // console.log(tab);

        // Read rows from spreadsheet
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: range_tmp,
        });


        let arrData = getRows.data.values;
        console.log(`длина массива ${arrData.length}`);

        // ** проброс названия вкладки в сводную
        for (k = 0; k < arrData.length; k++) {
            arrData[k].unshift(tab)
        }

        //Функция для создания доп колонок с вычисляемыми формулами
        const getNewColunm = function (column_name, position, formula) {
            arrData[0][position] = column_name;
            //начиная с 3 строчки
            let G = 3;
            for (f = 1; f < arrData.length; f++) {
                arrData[f][position] = `${formula}${G}`;
                G++
            }
        }
        // OTS
        getNewColunm('OTS', 47, '=$B$1/1000/100*G')

        // Unique Reach (тыс)
        getNewColunm('Unique Reach (тыс)', 48, '=$B$1/1000*Z')

        // Reach1+ (тыс)
        getNewColunm('Reach1+ (тыс)', 49, '=$B$1/1000*AA')

        //Reach2+ (тыс)	
        getNewColunm('Reach2+ (тыс)	', 50, '=$B$1/1000*AB')

        //Reach3+ (тыс)	
        getNewColunm('Reach3+ (тыс)', 51, '=$B$1/1000*AC')

        //Reach4+ (тыс)	
        getNewColunm('Reach4+ (тыс)', 52, '=$B$1/1000*AD')

        //Reach5+ (тыс)	
        getNewColunm('Reach5+ (тыс)', 53, '=$B$1/1000*AE')

        //Reach6+ (тыс)	
        getNewColunm('Reach6+ (тыс)', 54, '=$B$1/1000*AF')

        //Reach7+ (тыс)	
        getNewColunm('Reach7+ (тыс)', 55, '=$B$1/1000*AG')

        //Reach8+ (тыс)	
        getNewColunm('Reach8+ (тыс)', 56, '=$B$1/1000*AH')

        //Reach9+ (тыс)	
        getNewColunm('Reach9+ (тыс)', 57, '=$B$1/1000*AI')

        //Reach10+ (тыс)	
        getNewColunm('Reach10+ (тыс)', 58, '=$B$1/1000*AJ')

        //Reach11+ (тыс)	
        getNewColunm('Reach11+ (тыс)', 59, '=$B$1/1000*AK')

        //Reach12+ (тыс)	
        getNewColunm('Reach12+ (тыс)', 60, '=$B$1/1000*AL')

        //Reach13+ (тыс)	
        getNewColunm('Reach13+ (тыс)', 61, '=$B$1/1000*AM')

        //Reach14+ (тыс)	
        getNewColunm('Reach14+ (тыс)', 62, '=$B$1/1000*AN')

        //Reach15+ (тыс)	
        getNewColunm('Reach15+ (тыс)', 63, '=$B$1/1000*AO')

        //Reach16+ (тыс)
        getNewColunm('Reach16+ (тыс)', 64, '=$B$1/1000*AP')

        //Reach17+ (тыс)	
        getNewColunm('Reach17+ (тыс)', 65, '=$B$1/1000*AQ')

        //Reach18+ (тыс)	
        getNewColunm('Reach18+ (тыс)', 66, '=$B$1/1000*AR')

        //Reach19+ (тыс)	
        getNewColunm('Reach19+ (тыс)', 67, '=$B$1/1000*AS')

        //Reach20+ (тыс)	
        getNewColunm('Reach20+ (тыс)', 68, '=$B$1/1000*AT')

        console.log(TargetAudienceSize);


        // Write row(s) to spreadsheet
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "свод 1!A:BQ",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: arrData
            },
        });
    }

    response.send('Создание сводной завершено')
})

app.listen(port, () => {
    // console.log(`Example app listening on port ${port}`)
})
