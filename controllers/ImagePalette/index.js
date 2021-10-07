const palette = require('image-palette');
const pixels = require('image-pixels');

const { Result } =  require("../../Models");

module.exports = function(req, res){
    const { image } = req.query;

    pixels(image).then((r)=>{
        try{
            const {ids, colors} = palette(r);

            res.json(new Result(colors.map(r => "rgb(" + r.slice(0, 3).join(", ") + ")")));
        }catch(e){
            return Promise.reject();
        }
    }).catch((e)=>{
        res.json(new Result(null, "Algo deu errado!", -1));
    });
}