const path = require("path");
const File = require(path.join(process.cwd(), "src/modules/core/storage/file.model"));
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const storageService = require(path.join(process.cwd(), "src/modules/core/storage/storage.service"));

const updateCustomerProfile = async (req, res) => {
  try {
    const id = req.user.id;

    if (req.files) {
      await Promise.all(
        req.files.map(async (file) => {
          const uploadOptions = {
            folder: "demeed/profile-pictures",
            use_filename: true,
            fileName: file.path,
          };

          const response = await storageService.upload(uploadOptions);

          await File.create({
              name: response.url,
              owner_id: req.user.id,
              table_name: "users",
              created_by: req.user.id,
              updated_by: req.user.id,
          });
        })
      );
    }

    const customer = await User.findOne({
      where: { id },
    });

    const profile_image = await File.findOne({
      where: {
        owner_id: id,
      },
    });

    return res.status(200).json({
      profile: customer,
      profile_image,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error.");
  }
};

module.exports = updateCustomerProfile;
