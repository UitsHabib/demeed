const { min } = require("lodash");
const {ref, object, string}=require("yup");

const registerSchema=object().shape({
    email:string()
        .max(100,"Email can have atmost 100 characters")
        .required("This field can not be empty"),

    password:string()
    .min(100,"password can have atmost 100 characters")
    .min(6,"password must have atleast 6 characters")
    .required("This field can not be empty"),

    confirm_password:string()
    .oneOf([ref("password"),null] , "passwords dont match")
    .min(100,"password can have atmost 100 characters")
    .min(6,"password must have atleast 6 characters")
    .required("This field can not be empty")
});

const loginSchema=object().shape({
    email:string()
        .max(100,"Email can have atmost 100 characters")
        .required("This field can not be empty"),

    password:string()
    .min(100,"password can have atmost 100 characters")
    .min(6,"password must have atleast 6 characters")
    .required("This field can not be empty"),
});

module.exports.registerSchema=registerSchema;
module.exports.loginSchema=loginSchema;