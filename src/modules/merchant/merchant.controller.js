const jwt = require("jsonwebtoken");
const Merchant = require("./merchant.model");

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
        
        const user = await Merchant.findOne({ where: { email } });

        if(!user) {
            res.status(404).send("You have no account. Please create an account.")
        } else {
            if(password !== user.password) return res.status(400).send("Password does not match.");

            const access_token = jwt.sign({ id: user.id }, "zoha", {
                expiresIn: "1h",
                issuer: user.id.toString()
            })

            res.cookie("access_token", access_token, { httpOnly: true, signed: true });

            res.status(200).send(user);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal server error.")
    }

};

module.exports.logout = (req, res) => {
    res.clearCookie("access_token");
    res.status(200).send("User logout sucessfuly.")
}
