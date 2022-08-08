const Admin=require("./admin.model")
const getAdmin=async(req,res)=>{
    Admin.findAll()
    .then((users)=>res.send(users))
    .catch((err)=>console.log(err))
 }

 const createAdmin=async(req,res)=>{
   const {email,password}=req.body;
   try {
    const admin=await Admin.create({email,password});
    res.send(admin);
   } catch (error) {
    console.log(error);
   }
}
module.exports.createAdmin=createAdmin;
module.exports.getAdmin=getAdmin;
