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

const initialFrameData = {
    imgData: {col:'red', fid:'Press Button to show fid'},
    buttons: {label1: 'Show FID'},
    url
}

app.get('/', async (req, res) => {
    const body = await req.body;
    const nhl_data = await getServerData();
    console.log(nhl_data);

    res.render('page', initialFrameData );
})

app.post('/frame', async (req, res) => {

    const body = await req.body;
    
    let data = await getFrameMessage(body,  { NEYNAR_API_KEY: 'NEYNAR_API_DOCS' });
    console.log(data)

    let responseFrameData = {
        imgData: {col:'green', fid:body.untrustedData.fid ? body.untrustedData.fid : " err "},
        buttons: {},
        url
    }

    res.render('frame-response', responseFrameData);
});

app.listen(port, () => {
    console.log(`app listening at ${port}`)
});