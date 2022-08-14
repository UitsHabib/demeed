const app = require("./express")();

module.exports.start = () => {
    const port = 3000;

    app.listen(port, () => {
        console.log(`listening port ${port}.`);
    });
}