
module.exports = function(app){

    app.get('/api/v1/teste/', (req, res) => {
        res.json({
            version: "1.0",
            description: "Apenas um teste."
        });
    })
};