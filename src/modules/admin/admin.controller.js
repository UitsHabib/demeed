const Admin = require("./admin.model");

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

const adminSignUp = async (req, res) => {
    try {
        const {email,password}=req.body;

        const existingAdmin=await findExistingAdmin(email);

        if (existingAdmin.email) {
            res.send(`A Admin with ${existingAdmin.email} already exists.PLease try another email`);
        }else{
            await Admin.create({
                email,
                password
            });
            
            res.send("A new Admin has been created successfully");
        }
    } catch (error) {
        console.log(error);
    }
};

const adminSignIn = async (req, res) => {
  try {
    const {email,password}=req.body;

    const existingAdmin=await findExistingAdmin(email); 

    if (existingAdmin.email && existingAdmin.password) {
        if (existingAdmin.email==email && existingAdmin.password==password) {
            res.send("Admin has successfully logged in");
        }else{
            res.send("Invalid credentials");
        }
    }
  } catch (error) {
    console.log(error);
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

module.exports.adminSignIn = adminSignIn;
module.exports.adminSignUp = adminSignUp;
module.exports.adminForgotPassword = adminForgotPassword;
module.exports.adminResetPassword = adminResetPassword;