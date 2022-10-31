const multiparty = require('multiparty');

const format = (req, res, next) => {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        if (err) {
            return res.status(500).send("Internal Server Error");
        }

        for (const [key, value] of Object.entries(fields)) {
            req.body[key] = value[0];
        }

        req.files = files.images;

        next();
    });
};

module.exports = format;