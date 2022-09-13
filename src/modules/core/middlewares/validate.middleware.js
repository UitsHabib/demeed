function validate(schema) {
    return async function (req, res, next) {
      try {
        await schema.validate(req.body, { abortEarly: false });
        next();
      } catch (error) {
        const errs = [];
        error.inner.forEach((e) => {
          errs.push({
            path: e.path,
            message: e.message,
          });
        });
        return res.status(400).send(errs);
      }
    };
  }
  
  module.exports = validate;