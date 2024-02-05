const express = require("express");
const exphbs = require('express-handlebars');
const helpers = require("./lib/helpers");

const {
    getFrameMessage,
} =require('@coinbase/onchainkit');

const app = express();
app.use(express.json())

var hbs = exphbs.create({
    helpers      : helpers,

    partialsDir: [
        'views/partials'
    ]
});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const port = process.env.PORT || 3001;
const url = "https://handlebars-frame.up.railway.app";

const getServerData = async () => {
    const response = await fetch('https://nhl-score-api.herokuapp.com/api/scores?startDate=2024-01-27&endDate=2024-02-01');
    const data = await response.json();
    console.log(data);
    console.log(data.length)
    return data;
};

const initialFrameData = (data) => {
    return {
        imgData: {
            game_data: data,
            scene_id: 0, 
            game_id: 0
        },
        buttons: {label1: 'Get Scores'},
        url
    }
}

app.get('/', async (req, res) => {
    const body = await req.body;
    const nhl_data = await getServerData();
    console.log(nhl_data);

    res.render('page', initialFrameData(nhl_data[0]) );
})

app.post('/frame', async (req, res) => {

    const body = await req.body;
    
    let msg_data = await getFrameMessage(body,  { NEYNAR_API_KEY: 'NEYNAR_API_DOCS' });
    console.log(msg_data)

    let game_data = await getServerData();

    let responseFrameData =  {
        imgData: {
            game_data: data,
            scene_id: 0, 
            game_id: 0
        },
        buttons: {label1: 'Get Scores'},
        url
    }

    res.render('frame-response', responseFrameData);
});

app.listen(port, () => {
    console.log(`app listening at ${port}`)
});