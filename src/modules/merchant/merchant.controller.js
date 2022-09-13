const Merchant = require("./merchant.model");
const { generatAccessToken } = require("./merchant.service");

module.exports.getMerchants = async (req, res) => {
    try{
        const merchants = await Merchant.findAll();

        res.status(200).send(merchants);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal server error.")
    }
};

module.exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [ user, created ] = await Merchant.findOrCreate({
            where: { email },
            defaults: {
                email,
                password
            }
        })

        if(!created) {
            return res.status(409).send("User already exist.");
        }

        res.status(201).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    };
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const merchant = await Merchant.findOne({ where: { email, password } });

        if(!merchant) {
            res.status(404).send("You have no account. Please create an account.")
        }

        res.cookie("access_token", generatAccessToken(merchant), { httpOnly: true, signed: true });

        res.status(200).send(merchant);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal server error.")
    }

};

module.exports.logout = (req, res) => {
    res.clearCookie("access_token");
    res.status(200).send("User logout sucessfuly.")
}

module.exports.getSinginMerchentProfile = async (req, res) => {
    try {    
        const merchant = await Merchant.findOne({ where: { id: req.user.id } });
    
        if (!merchant) {
          return res.status(404).send("User not found.");
        }
    
        res.status(200).send(merchant);
    } catch (error) {
        res.status(500).send("Internal server error.");
    }
}
