const { Result } =  require("../../Models");

const Streaming = require("./Streaming");

//http://cangaceirojavascript.com.br/streaming-audio-node/

//https://stackoverflow.com/questions/23330493/node-js-stream-mp3-to-http-without-having-to-save-file
var ytdl = require('ytdl');
var ffmpeg = require('fluent-ffmpeg');

module.exports = function(req, res){
    try{
        const { id } = req.query;

        var url = 'https://music.youtube.com/watch?v='+id;

        res.set({ "Content-Type": "audio/mpeg" });
        ffmpeg().input(ytdl(url)).toFormat('mp3').pipe(res);
    }catch(e){
        res.json(new Result(null, "Algo deu errado!", -1));
    }
}