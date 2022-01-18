const express = require('express');
const https = require('https');
const app = express();

const apiKey = '5b3c7511193f0609bba96375c635040c';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const port = process.env.PORT || 3000;

const getData = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            res.on('data', data => {
                let jsonData= JSON.parse(data);
                resolve(jsonData);
            });
        })
        .on('error', e => {
            reject(e);
        });
    });
};

app.use(express.static(__dirname + '/wwwroot'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/wwwroot/index.html");
});

app.post("/",(req, res) => {
    let city = req.query.city;
    let url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;
    getData(url)
    .then(data => {
        res.json(data);
    })
    .catch(error => console.log(error));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

