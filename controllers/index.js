const imagePalette = require("./ImagePalette");

module.exports = function(app){

    app.get('/api/v1/image-palette/', imagePalette);

};