const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const prisma = new PrismaClient();
const userController = {};

userController.signUp = async (req, res) => {
    const { name, email, phonenumber, profile_pic, password, username, sociallinks } = req.body;

    if (!name || !profile_pic || !email || !phonenumber || !password || !username || !sociallinks) {
        return res.status(401).send({
            status: 401,
            message: "Please enter all fields!!",
        });
    }

    try {
        const n = await prisma.user.count({
            where: {
                email,
            }
        });

        //check if the user by email exists
        let isFound = n > 0 ? true : false;

        if (isFound) {
            return res.status(401).send({
                status: 401,
                message: "User already exists!!",
            });
        } else {
            let salt = await bcrypt.genSalt(10);
            let pwd = await bcrypt.hash(password, salt);

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    phonenumber,
                    password: pwd,
                    profilepictureurl: profile_pic,
                    userName: username,
                    socialLinks: {
                        create: sociallinks
                    }
                }
            });

            const token = jwt.sign({ newUser }, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });

            res.status(200).json({
                token,
                user: newUser,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};

userController.logIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).send({
            status: 401,
            message: "Please enter all fields!"
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
            include: {
                socialLinks: true
            }
        });

        //decrypt password and compare with the one sent from body
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);

            if (isMatch) {
                const token = jwt.sign(user[0], process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });

                res.status(200).json({ token: token, user: user });
            } else {
                return res.status(401).send({
                    status: 401,
                    message: "Invalid credentials!",
                });
            }
        } else {
            return res.status(401).send({
                status: 401,
                message: "User doesn't exits!",
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};

//todo
userController.editProfile = async (req, res) => {
    const { id, name, email, phonenumber, profile_pic, password, username, sociallinks } = req.body;

    if (!name || !profile_pic || !email || !phonenumber || !password || !username || !sociallinks) {
        return res.status(401).send({
            status: 401,
            message: "Please enter all fields!!",
        });
    }

    try {
        const updateProfile = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                phonenumber,
                password: pwd,
                profilepictureurl: profile_pic,
                userName: username,
                socialLinks: {
                    create: sociallinks
                }
            }
        });
        res.status(200).json({
            token,
            user: updateProfile,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};

userController.updateProfilePicture = async (req, res) => {
    const { id, url } = req.body;

    if (isNaN(id) || !url) {
        return res.status(401).send({
            status: 401,
            message: "Please Enter all fields!"
        });
    }

    try {
        const updateProfilePicture = await prisma.user.update({
            where: {
                id
            },
            data: {
                profilepictureurl: url
            }
        });

        res.status(200).send({
            updateProfilePicture
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
}

userController.getUserById = async (req, res) => {
    const id = parseInt(req.query.id);

    if (isNaN(id)) {
        return res.status(401).send({
            status: 401,
            message: "Please Enter all fields!"
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });

        res.status(200).send({
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};


userController.getUserByEmail = async (req, res) => {
    const { email } = req.body;

    if (email) {
        return res.status(401).send({
            status: 401,
            message: "Please Enter all fields!"
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        res.status(200).send({
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};

userController.getUserByUserName = async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(401).send({
            status: 401,
            message: "Please Enter all fields!"
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                userName: username
            }
        });

        res.status(200).send({
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};

userController.updateSocialLinks = async (req, res) => {
    const { userId, socialLinks } = req.body;

    if (!userId || !socialLinks || socialLinks.lenght == 0) {
        return res.status(401).send({
            status: 401,
            message: "Please Enter all fields!"
        });
    }

    try {
        const updateSocialLinks = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                socialLinks: socialLinks
            }
        });

        res.status(200).send({
            updateSocialLinks
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
}

module.exports = userController;