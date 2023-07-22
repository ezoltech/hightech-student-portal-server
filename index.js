const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = require("./routes/routes");
const fileUpload = require("express-fileupload");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const PORT = 3000 || process.env.PORT;

let prisma;

if (process.env.DEBUG_MODE === 'true') {
    prisma = new PrismaClient({
        log: ['query', 'info', 'warn'],
        errorFormat: 'pretty',
        datasources: {
            db: {
                url: process.env.DATABASE_URL_DEBUG,
            },
        },
    });
} else {
    //consume all console.log functions so we don't log them in prod.
    if (process.env.CONSOLE_LOG === 'false') {
        console.log = function () { };
    }
    prisma = new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });
}

async function connectToDb() {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

connectToDb();

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "HighTech backend API",
            version: "1.0",
            description:
                "This is a simple REST API for HighTech student portal",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "HighTech",
                url: "",
                email: "",
            },
        },
        servers: [
            {
                url: "http://localhost:" + PORT,
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const ops = {
    explorer: true,
    excludeProperties: ['id']
};

const specifications = swaggerJsdoc(options);

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specifications, ops));

app.get("/", (req, res) => {
    res.send({
        status: "running...",
        message: "docs api can be found at /api-docs"
    });
})

app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log("Server started running on port: " + PORT);
});