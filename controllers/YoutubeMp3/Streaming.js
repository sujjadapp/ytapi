const fetch = require('node-fetch');

module.exports = function(videoId){
    return new Promise((resolve, reject)=>{
        try{
            fetch("https://api.snappea.com/v1/video/details?url=https://www.youtube.com/watch?v="+videoId).then(r => r.json()).then((r)=>{
                let url = "";
                let tagId = "";

                let list = r.videoInfo.downloadInfoList.filter(v => (v.mime === "audio"));

                let list_filter = JSON.parse(JSON.stringify(list));

                if(list.length > 1){
                    list_filter = list_filter.filter(v => (v.size <= 5000000));
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

                var myRequest = new Request("https://api.snappea.com/v1/video/convert?videoKey=youtube_"+videoId+"&language=pt", myInit);

                fetch(myRequest).then(t => t.json()).then((d)=>{
                    resolve(d.downloadUrl);
                }).catch((e)=>{reject(e);});
            }).catch((e)=>{reject(e);});
        }catch(e){reject(e);}
    });
}
