const UserDeliveryMan = require('./delivery.model.js');

// sign up functionality for delivery man.
const signupDeliveryMan = (req,res) => {
    const data = {...req.body};
    // check email exsists or not.
    UserDeliveryMan.findOne({where:{email:data.email}})
        .then(result=>{
            if(result){
                res.send({"message":`${result.dataValues.email} already exsists,choose different email.`});
            }else{
                // create a new user to `user_delivery_man` table.
                UserDeliveryMan.create(data)
                .then(()=>{
                    res.send({'message':'Welcome ! sign up successful.'})
                })
                .catch(error=>{
                    res.send(error);
                })
            }
        })
        .catch(error=>{
            res.send(error);
        })
    }
module.exports.signupDeliveryMan = signupDeliveryMan;