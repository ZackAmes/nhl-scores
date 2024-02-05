const { createCanvas } = require("canvas");

exports.canvasUrl = function (imgData) {

    console.log(imgData);

    let {game_data, scene_id, game_id} = imgData;
    let width = 640;
    let height = 360;
    const canvas = createCanvas(width,height);
    var ctx = canvas.getContext('2d');
    if(game_data.games.length === 0){
        ctx.fillStyle = 'black';
        ctx.fillText("No games" , 260, 180);
    }
    if(scene_id == 0){
        ctx.fillStyle = 'blue';
        ctx.fillText("NHL Scores " + game_data.date.pretty, 260, 180);
        ctx.fillText(game_data.games.length + " games today", 260, 240 )
    }
    else if(scene_id == 1){
        ctx.fillStyle = 'red';
        console.log(game_data.games[0]);
    }
    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL();

    // Return the HTML with the data URL
    return dataURL;
}