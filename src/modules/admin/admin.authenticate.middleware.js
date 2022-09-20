const passport = require("passport")

const AdminStrategy=(req,res,next)=>{
    
    const auth= passport.authenticate("admin-jwt",async(error,admin)=>{
        if (error) {
            res.status(500).send("internal server error");
        }

        if (!admin) {
            return res.status(401).send("unauthenticated admin");
        }

        req.login(admin, {session:false}, (err)=>{
            if (err) {
               return next(err);
            }
            
            next();
        })   
    })

    auth(req,res,next)
}

module.exports=AdminStrategy