const { string, array, object } = require("yup");

const profileSchema = object().shape({
    title: string()
        .max(60, "This field must be at most 60 characters long.")
        .required("This field must not be empty."),
    description: string()
        .max(200, "This field must be at most 200 characters long.")
        .required("This  field must not be empty."),
    permissions: array()
        .of(string())
        .required("This  field must not be empty.")
});

const profileUpdateSchema = object().shape({
    title: string()
        .max(60, "This field must be at most 60 characters long."),
    description: string()
        .max(200, "This field must be at most 200 characters long."),
    pemissions: array()
        .of(string())
});

module.exports.profileSchema = profileSchema;
module.exports.profileUpdateSchema = profileUpdateSchema;