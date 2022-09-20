const Admin = require("./admin.model");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./admin.service");

const findExistingAdmin = async (email) => {
  try {
    const existingAdmin=await Admin.findOne(
        {
            where:{
                email:email
            }
        }
      );

      if (existingAdmin) {
        return existingAdmin;
      }else{
        return false;
      }

  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
    try {
        const {email,password,role}=req.body;

        const existingAdmin=await findExistingAdmin(email);

        if (existingAdmin.email) {
            res.send(`A Admin with ${existingAdmin.email} already exists.PLease try another email`);
        }else{
            await Admin.create({
                email,
                password,
                role
            });
            
            res.status(201).send("A new Admin has been created successfully");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
};

const signIn = async (req, res) => {
  try {
    const {email,password}=req.body;

    const admin=await Admin.findOne({
        where:{
            email,
            password
        }
    });

    if (!admin) {
        res.status(400).send("Invalid Credentials")
    }

    res.cookie("access_token",generateAccessToken(admin),{
        httpOnly: true,
        signed: true
    });

    res.status(200).send(admin)
  } catch (error) {
    res.status(500).send("Internal Server Error.")
  }
};

const adminForgotPassword = async (req, res) => {
    try {
        const {email}=req.body;

        const existingAdmin=await findExistingAdmin(email); 

        if (existingAdmin) {
            res.send("A link has been sent to the Admin to reset the password");
        }else{
            res.send("Admin not found")
        }
    } catch (error) {
        console.log(error);
    }

};

const adminResetPassword = async (req, res) => {
    const {email,password,confirm_password}=req.body;

    if (password==confirm_password) {
        const existingAdmin=await findExistingAdmin(email);
        
        if (existingAdmin.email) {
            await Admin.update(
                {
                    password
                },
                {
                    where:{
                        email
                    }
                }
            );

            res.send("A new password has been set successfully")
        } 
        
    }else{
        res.send("Passwords did not match. Try Again")
    }

  
};

const getSignedInUser=async(req,res)=>{
    try {
        const admin=await Admin.findOne({
            where:{
                id: req.user.id
            }
        });
        
        res.status(200).send(admin)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
}

module.exports.getSignedInUser = getSignedInUser;
module.exports.signIn = signIn;
module.exports.signUp = signUp;
module.exports.adminForgotPassword = adminForgotPassword;
module.exports.adminResetPassword = adminResetPassword;