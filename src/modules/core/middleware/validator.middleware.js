const validate = (schema) => {
    return async (req, res, next) => {
        try{
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch(err) {
            const errors = [];

            err.inner.forEach(e => {
                errors.push({ path: e.path, message: e.message });
            });

            res.status(400).send(errors);
        };
    };
};

module.exports = validate;