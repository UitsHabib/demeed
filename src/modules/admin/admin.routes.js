const {createAdmin,getAdmin}=require("./admin.controller");
module.exports=function(app){
    app.post("/admin",createAdmin);
    app.get("/admins",getAdmin);
}