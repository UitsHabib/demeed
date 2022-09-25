const Delivery = require("./delivery.model");

const checkIfDeliveryManExists = async (email) => {
  try {
    const existingDeliveryMan = await Delivery.findOne({
      where: {
        email: email,
      },
    });
    return existingDeliveryMan;
  } catch (error) {
    console.log(error);
  }
};

const deliveryManSignIn = async (req, res) => {
  const signInRequest = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const response = await Delivery.findOne({
      where: {
        email: signInRequest.email,
        password: signInRequest.password,
      },
    });
    if (!response) {
      res.send("Invalid credentials");
    } else {
      console.log(response);
      res.send("Signed in successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

const deliveryManSignUp = async (req, res) => {
  const deliveryMan = {
    email: req.body.email,
    password: req.body.password,
  };
  const existingDeliveryMan = await checkIfDeliveryManExists(deliveryMan.email);
  console.log(existingDeliveryMan);
  if (!existingDeliveryMan) {
    try {
      await Delivery.create(deliveryMan);
      res.send("New delivery man's account created successfully");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("A delivery man's account with this email already exists");
  }
};

const deliveryManForgotPassword = async (req, res) => {
    const email = req.body.email;

    const existingDeliveryMan = await checkIfDeliveryManExists(email);
    if(existingDeliveryMan) {
        res.send("A reset password link sent to your email");
    } else {
        res.send("Account with this email not found");
    }
}

module.exports.deliveryManSignIn = deliveryManSignIn;
module.exports.deliveryManSignUp = deliveryManSignUp;
module.exports.deliveryManForgotPassword = deliveryManForgotPassword;

