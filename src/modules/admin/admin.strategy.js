const passport = require("passport");
const { Strategy } = require("passport-jwt");
const Admin = require("./admin.model");

module.exports=()=>{
    function cookieExtractor(req){
        let token = null;
        
        if (req && req.signedCookies) {
            token=req.signedCookies["access_token"];
        }

        return token;
    }
    
    passport.use(
        "admin-jwt",
        new Strategy(
            {secretOrKey: "jwt-secret", jwtFromRequest: cookieExtractor},
        
            async function(payload,done){
                console.log(payload);
                try {
                    const admin=await Admin.findOne({
                        where:{
                            id:payload.id
                        }
                    });

                    if (admin) {
                        console.log("admin found");
 
                       return done(null, admin);
                    }else{
                        console.log("admin not found");
                    }
                    
                    return done(null, false);
                    
                } catch (error) {
                    console.log(error);
                }
            }
        )   
    )
}


