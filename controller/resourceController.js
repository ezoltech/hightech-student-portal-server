const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const resourceController = {};

resourceController.create = async (req, res) => {
    const { name, title, description, tags, department, userId, category, filepath } = req.body;

    if (!name || !title || !description || !tags || !department || !userId || !category || !filepath) {
        return res.status(401).send({
            status: 401,
            message: "Please enter all fields"
        });
    }

    try {
        const newResource = await prisma.resource.create({
            name,
            title,
            description,
            tags,
            views: 0,
            likes: 0,
            downloadCount: 0,
            status: "pending",
            department,
            userId,
            category,
            filepath,
        });

        res.status(200).send({
            resource: newResource
        });

    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};

resourceController.getResourceById = async (req, res) => {
    const id = parseInt(req.param.id);

    if (isNaN(id)) {
        return res.status(401).send({
            status: 401,
            message: "Please enter all fields!"
        });
    }

    try {
        const resource = await prisma.resource.update({
            where: {
                id
            },
            data: {
                views: {
                    increment: 1
                }
            },
            include: {
                comments: true,
                photos: true
            }
        });

        res.status(200).send({
            resource
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};

resourceController.getResourceByUserId = async (req, res) => {
    const userId = parseInt(req.param.userId);

    if (isNaN(userId)) {
        return res.status(401).send({
            status: 401,
            message: "Please Enter all fields!"
        });
    }

    try {
        const resourceByUserId = await prisma.resource.updateMany({
            where: {
                userId
            },
            data: {
                views: {
                    increment: 1
                }
            },
            include: {
                comments: true,
                photos: true
            }
        });

        res.status(200).send({
            resourceByUserId
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};

resourceController.getResourceByDepartment = async (req, res) => {
    const department = req.param.department;

    if (!department) {
        return res.status(401).send({
            status: 401,
            message: "Please enter all fields!"
        });
    }

    try {
        const resourceByDepartment = await prisma.resource.updateMany({
            where: {
                department
            },
            data: {
                views: {
                    increment: 1
                }
            },
            include: {
                comments: true,
                photos: true
            }
        });

        res.status(200).send({
            resourceByDepartment
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};

resourceController.searchResources = async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(401).send({
            status: 401,
            message: "Please enter all fields!"
        });
    }

    try {
        const foundResrouce = await prisma.resource.updateMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query
                        }
                    },
                    {
                        description: {
                            contains: query
                        }
                    },
                    {
                        tags: {
                            contains: query
                        }
                    }
                ]
            },
            data: {
                views: {
                    increment: 1
                }
            },
            include: {
                comments: true,
                photos: true
            }
        });

        res.status(200).send({
            foundResrouce
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
};

resourceController.deleteResource = async (req, res) => {
    const id = parseInt(req.param.id);

    if (isNaN(id)) {
        return res.status(401).send({
            status: 401,
            message: "Please enter all fields!"
        });
    }

    try {
        const deleteRes = await prisma.resource.delete({
            where: {
                id
            }
        });

        res.status(200).send({
            deleteRes
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: error.meta || "Internal error check the server log!!",
        });
    }
}

module.exports = resourceController;