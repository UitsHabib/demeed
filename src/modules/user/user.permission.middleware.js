const User = require("./user.model");
const Profile = require("../profile/profile.model");
const PermissionSet = require("../permission-set/permission-set.model");
const Permission = require("../permission/permission.model");

const PermissionStrategy = (serviceId) => {
  return async (req, res, next) => {
    const userId = req.user.id;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user.profile) {
      return res.status(404).send("You are not authorized for this action.");
    }

    const profileId = user.profile;

    const profile = await Profile.findOne({
      where: {
        id: profileId,
      },
    });

    const permissionSetId = profile.permissionSet;

    const permissionSet = await PermissionSet.findOne({
      where: {
        id: permissionSetId,
      },
    });

    const permissionIds = JSON.parse(permissionSet.permissions);

    let matchedService;

    for (let i = 0; i < permissionIds.length; i++) {
      const permission = await Permission.findOne({
        where: {
          id: permissionIds[0],
        },
      });

      const services = JSON.parse(permission.services);

      matchedService = services.find((service) => service === serviceId);
    }

    if (matchedService) {
      return next();
    }

    return res.status(404).send("You are not authorized for this action.");
  };
};

module.exports = PermissionStrategy;
