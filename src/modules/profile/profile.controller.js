const Profile = require("./profile.model");

const createProfile = async (req, res) => {
  try {
    // const { permissionSet } = req.body;

    // const newProfile = {
    //   permissionSet,
    // };

    // await Profile.create(newProfile);

    res.status(201).send("Ok");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports.createProfile = createProfile;
