module.exports = function(app){

    app.get('/api/v1/image-palette/', require("./ImagePalette"));

    app.get('/api/v1/youtube-mp3/', require("./YoutubeMp3"));

};