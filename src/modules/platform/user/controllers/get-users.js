const path = require("path");
const { Op } = require("sequelize");
const User = require(path.join(process.cwd(), "src/modules/platform/user/user.model"));
const Profile = require(path.join(process.cwd(), "src/modules/platform/profile/profile.model"));

const getUsers = async (req, res) => {
    try {
        const page = req.query.page ? req.query.page - 1 : 0;
        if(page < 0) return res.status(404).send("Page must be greater or equal one");

        const limit = req.query.limit ? +req.query.limit : 15;
        const offset = page * limit;
        
        const order = [
            ["created_at", "DESC"],
            ["id", "DESC"]
        ]

        const { count: countByUser, rows: users } = await User.findAndCountAll({
            where: { 
                id: {
                    [Op.ne]: req.user.id
                }
            },
            include: [
                {
                    model: Profile,
                    as: "profile",
                    attributes: ["id", "title", "description", "type"]
                },
                {
                    model: User,
                    as: "createdByUser",
                    attributes: ["id", "email", "profile_id" ]
                },
                {
                    model: User,
                    as: "updatedByUser",
                    attributes: ["id", "email", "profile_id"]
                }
            ],
            offset,
            limit,
            order
        });

        const totalUser = countByUser;

        const data = {
            users,
            metaData: {
                page: page + 1,
                limit: limit,
                total: totalUser,
                start: limit * page + 1,
                end: offset + limit > totalUser ? totalUser : offset + limit
            }
        };

        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.")
    };
};

module.exports = getUsers;