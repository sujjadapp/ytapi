const { Result } =  require("../../Models");

const ytdl = require('ytdl-core');

module.exports = async (req, res)=>{
    try{
        const { media_id, download } = req.query.q
console.log(media_id)
        let url = 'https://music.youtube.com/watch?v='+media_id;

        if(ytdl.validateURL(url)){
            const info = await ytdl.getBasicInfo(url);

            let videoReadableStream = ytdl(url, { filter: 'audioonly', quality: [18, 140] });

            videoReadableStream.on("response", response => {
                for(let k in response.headers){
                    res.setHeader(k, response.headers[k]);
                }

                if(Number(download === "" ? 1 : download)){
                    let f = (/webm$/gi).test(response.headers["content-type"]) ? ".webm" : ".mp3";
                    res.setHeader('Content-disposition', 'attachment; filename=music_' + media_id + f);
                }
            });

            const stream = videoReadableStream.pipe(res);

            stream.on('finish', ()=>{
                res.end();
            });
        }else{
            throw new Error("oops");
        }
    }catch(e){
        res.set({ "Content-Type": "audio/mpeg" });
        res.end();
        //res.json(new Result(null, "Algo deu errado!", -1));
    }
}
