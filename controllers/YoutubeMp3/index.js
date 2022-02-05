const { Result } =  require("../../Models");
const request = require('request');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');

module.exports = async (req, res)=>{
    try{
        const { media_id, download } = req.query.q
console.log(req.query.q)
  //      let url = 'https://www.youtube.com/watch?v='+media_id;
return new Promise((resolve, reject)=>{
        try{
            
            fetch("https://api.snappea.com/v1/video/details?url=https://www.youtube.com/watch?v="+req.query.q).then(r => r.json()).then((r)=>{
                let url = "";
                let tagId = "";
// res.json(r);
// res.end();
                let list = r.videoInfo.downloadInfoList.filter(v => (v.mime === req.query.mime));

                let list_filter = JSON.parse(JSON.stringify(list));

                if(list.length > 1){
                    list_filter = list_filter.filter(v => (v.tag ==req.query.tagui));
                    list_filter = list_filter.length < 1 ? [list[list.length-1]] : list_filter;
                }

                let download = list_filter[list_filter.length-1];

                url = download.partList[0].urlList[0];
                tagId = download.tag;

                var myInit = { method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                    cache: 'default',
                    body: JSON.stringify({tagId: tagId,
                    url: url})
                };

                var myRequest = new request("https://api.snappea.com/v1/video/convert?videoKey=youtube_"+req.query.q+"&language=pt", myInit);

                fetch("https://api.snappea.com/v1/video/convert?videoKey=youtube_"+req.query.q+"&language=ar", myInit).then(t => t.json()).then((d)=>{
//                     res.json(myInit);
// res.end();
                                    res.json(d);
  res.end();
                    resolve(d.downloadUrl);
                }).catch((e)=>{reject(e);});
            }).catch((e)=>{reject(e);});
        }catch(e){reject(e);}
    });
//        if(ytdl.validateURL(url)){
//            const info = await ytdl.getBasicInfo(url);
//
//            let videoReadableStream = ytdl(url, { filter: 'audioonly', quality: [18, 140] });
//
//            videoReadableStream.on("response", response => {
//                for(let k in response.headers){
//                    res.setHeader(k, response.headers[k]);
//                }
//
//                if(Number(download === "" ? 1 : download)){
//                    let f = (/webm$/gi).test(response.headers["content-type"]) ? ".webm" : ".mp3";
//                    res.setHeader('Content-disposition', 'attachment; filename=music_' + media_id + f);
//                }
//            });
//
//            const stream = videoReadableStream.pipe(res);
//
//            stream.on('finish', ()=>{
//                res.end();
//            });
//        }else{
//            throw new Error("oops");
//        }
    }catch(e){
     //   res.set({ "Content-Type": "audio/mpeg" });
       // res.end();
        //console.log("Error :"+req.query);
        res.json(new Result(null, req.query.q, -1));
    }
}
