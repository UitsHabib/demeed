const Merchant = require("./merchant.model");

const merchantIsExist = async (email) => {
    try{
        const merchant = await Merchant.findOne({ where: { email }});

        return merchant;
    } catch(err) {
        console.log(err);
        return null;
    };
};

module.exports.getMerchants = async (req, res) => {
    try{
        const merchants = await Merchant.findAll();

        res.send(merchants);
    } catch(err) {
        console.log(err);
    }
};

module.exports.merchantSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const merchant = await merchantIsExist(email);

        if(!merchant) {
            res.send("Merchant can not exists.")
        } else {
            if(merchant.password == password) {
                res.cookie("Send token");
                res.send("Merchant loged in.");
            } else {
                res.send("Password does not match.");
            }
        };
    } catch(err) {
        console.log(err);
    }

};

module.exports.merchantSignUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const merchant = await merchantIsExist(email);

        if(merchant) {
            res.send("Already have an account.");
        } else {
            const newMerchant = await Merchant.create({ email, password });

            res.send(newMerchant);
        }
    } catch (err) {
        console.log(err);
    };
};

module.exports.merchantForgetPassword = async (req, res) => {
    try{
        const { email } = req.body;
        const merchant = await merchantIsExist(email);
        
        if(!merchant) {
            res.send("Email is not found. Please create a account.");
        } else {
            res.send("Sending the reset password link to your email.");
        }
    } catch(err) {
        console.log(err);
    }
}