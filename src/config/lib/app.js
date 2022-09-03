module.exports.start = () => {
    const app = require('./express')();

    app.listen(3000, () => console.log("Listening on port 3000"));
}