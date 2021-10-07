const palette = require('image-palette')
const pixels = require('image-pixels')

module.exports = function(req, res){
    const { image } = req.query;

    pixels(image).then((r)=>{
        try{
            const {ids, colors} = palette(r);

            res.json({
                version: "1.0",
                code: 1,
                result: colors.map(r => "rgb(" + r.slice(0, 3).join(", ") + ")"),
                description: ""
            });
        }catch(e){
            return Promise.reject();
        }
    }).catch((e)=>{
        res.json({
            version: "1.0",
            code: 0,
            description: "Algo deu errado!"
        });
    });
}