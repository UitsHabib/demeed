const Entity = require("./entity.model");

const getEntities = async (req, res) => {
    try{
        const entities = await Entity.findAll({});
        
        if (!entities) {
            return res.status(404).send("Entity not found.");
        }

        res.status(200).send(entities);
    } 
    catch(error){
        res.status(500).send("Internal server error.");
    }
}

// const postEntities = () => {
//     try{
//         const { users, permissions, profile } = req.body;


//     }
//     catch(error){

//     }
// }

module.exports.getEntities = getEntities;