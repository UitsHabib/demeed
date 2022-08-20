module.exports.start = function(){
    const app = require('./express.js')();
    const port = 3000;

    app.listen(port, ()=>{
        console.log(`running on the port ${port}`)
    });
}