const path = require("path");
const cloudinary = require(path.join(process.cwd(), "src/config/lib/cloudinary"));
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const Image = require(path.join(process.cwd(), "src/modules/platform/image/image.model"));

const updateCustomerProfile = async (req, res) => {
	try {
		const id = req.user.id;
		const customer = await User.findOne({
			where: { id },
			include: [
				{
					model: Image,
					as: "profile_image",
				},
			],
		});
		const profileImageId = customer.profile_image_id;

		const profileImage = profileImageId
			? await Image.findOne({
					where: {
						id: profileImageId,
					},
			  })
			: null;

		if (req.file?.path) {
			if (profileImage) await cloudinary.uploader.destroy(profileImage.public_id);

			const fileUrl = await cloudinary.uploader.upload(req.file?.path);

			const [profile_image, created] = await Image.findOrCreate({
				where: { public_id: fileUrl.public_id },
				defaults: { url: fileUrl.secure_url, public_id: fileUrl.public_id, created_by: customer.id, updated_by: customer.id },
			});

			await customer.update(
				{ profile_image_id: profile_image.id },
				{
					include: [
						{
							model: Image,
							as: "profile_image",
						},
					],
				}
			);
		}
		return res.status(200).json(customer);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal server error.");
	}
};

module.exports = updateCustomerProfile;
