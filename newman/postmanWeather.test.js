const newman = require('newman');
require('dotenv').config();

const globalVars = [
    {
        "key": "apiKey",
        "value": `${process.env.API_KEY}`
    },
    {
         "key": "apiURL",
        "value": `${process.env.API_URL}`
    }
];

newman.run({
    collection: require('./CurrentWeather.postman_collection.json'),
    reporters: 'cli',
    envVar: globalVars
}, function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
});

newman.run({
    collection: require('./ForecastWeather.postman_collection.json'),
    reporters: 'cli',
    envVar: globalVars,
}, function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
});