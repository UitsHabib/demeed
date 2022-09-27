const { string, object, ref } = require('yup');

const registerSchema = object().shape(
    {
        permission_name: string()
            .required("Must give permission name")
    }
)

module.exports.registerSchema = registerSchema;