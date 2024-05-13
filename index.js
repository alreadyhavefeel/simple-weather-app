import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import axios from 'axios';
import morgan from 'morgan';

const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));

//import dotenv to use API_KEY
import 'dotenv/config'
const apiKey= process.env.API_KEY;

app.get('/', async (req, res) => {
    res.render('index.ejs' );
});

app.post('/', async (req, res) => {
    try {
        const lat = req.body.lat;
        const lon = req.body.lon;
        const weatherNow = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const weatherForecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        console.log(weatherForecast.data);
        res.render('index.ejs', { weather: weatherNow.data, weatherF: weatherForecast.data})
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});