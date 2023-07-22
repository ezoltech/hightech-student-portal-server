const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier for the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         phonenumber:
 *           type: string
 *           description: The phone number of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         profilepictureurl:
 *           type: string
 *           description: The URL of the user's profile picture
 *         userName:
 *           type: string
 *           description: The username of the user
 *         socialLinks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Link'
 *           description: The social links of the user
 *         joinedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user joined
 *       required:
 *         - name
 *         - email
 *         - password
 *         - userName
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Link:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier for the link
 *         name:
 *           type: string
 *           description: The name of the link
 *         iconUrl:
 *           type: string
 *           description: The URL of the link's icon
 *         url:
 *           type: string
 *           description: The URL of the link
 *         userId:
 *           type: integer
 *           format: int64
 *           description: The ID of the user who created the link
 *       required:
 *         - name
 *         - iconUrl
 *         - url
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Photo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier for the photo
 *         url:
 *           type: string
 *           description: The URL of the photo
 *         alt:
 *           type: string
 *           description: The alternative text for the photo
 *       required:
 *         - url
 *         - alt
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier for the comment
 *         userId:
 *           type: integer
 *           format: int64
 *           description: The ID of the user who created the comment
 *         resourceId:
 *           type: integer
 *           format: int64
 *           description: The ID of the resource the comment is associated with
 *         content:
 *           type: string
 *           description: The content of the comment
 *         likes:
 *           type: integer
 *           format: int64
 *           description: The number of likes the comment has received
 *         dislikes:
 *           type: integer
 *           format: int64
 *           description: The number of dislikes the comment has received
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the comment was created
 *       required:
 *         - userId
 *         - resourceId
 *         - content
 *         - likes
 *         - dislikes
 */

const userController = require("../controller/userController");
const resourceController = require("../controller/resourceController");

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Created a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 3Thp81rDFrKXr3WrY1MyMnNK8kKoZBX9lg-JwFznR-M
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '401':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message: 
 *                   type: string
 *                   example: Please enter all fields
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal error check the server log!!
 */
router.post("/users/signup", userController.signUp);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login
 *     description: logs in the user with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: the email for the user
 *                 example: yohannes@hightech.com
 *               password:
 *                 type: string
 *                 description: the password for the user
 *                 example: sliding_monkey123
 *     responses:
 *       '201':
 *         description: Login was successful!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 3Thp81rDFrKXr3WrY1MyMnNK8kKoZBX9lg-JwFznR-M
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '401':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message: 
 *                   type: string
 *                   example: Please enter all fields
 *       '401-1':
 *         description: Invalid credentials!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message: 
 *                   type: string
 *                   example: Invalid credentials! 
 *       '401-2':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message: 
 *                   type: string
 *                   example: Please enter all fields
 *       '401-3':
 *         description: User doesn't exist!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message: 
 *                   type: string
 *                   example: User doesn't exist!
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal error check the server log!!
 */
router.post("/users/login", userController.logIn);

/**
 * @swagger
 * /users/edit:
 *   put:
 *     summary: Update user 
 *     description: Updates user with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 3Thp81rDFrKXr3WrY1MyMnNK8kKoZBX9lg-JwFznR-M
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal error check the server log!!
 */
router.put("/users/edit", userController.editProfile);

/**
 * @swagger
 * /users/update-profile:
 *   put:
 *     summary: Update user 
 *     description: Updates user with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: int
 *                 example: 1
 *               url:
 *                 type: string
 *                 example: https://some-file-location/some-image.png
 *     responses:
 *       '200':
 *         description: updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal error check the server log!!
 */
router.put("/users/update-profile", userController.updateProfilePicture);

/**
 * @swagger
 * /users/update-social:
 *   put:
 *     summary: Update user social links
 *     description: Updates user social links with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: int
 *                 example: 1
 *               socialLinks:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Link'
 *     responses:
 *       '200':
 *         description: Created a new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal error check the server log!!
 */
router.put("/users/update-social", userController.updateSocialLinks);

/**
 * @swagger
 * /users/id/{id}:
 *   get:
 *     summary: Get user by ID 
 *     description: gets user with the provided information
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to retrive
 *         required: true
 *         schema:
 *           type: integer
 *           format: int
 *     responses:
 *       '200':
 *         description: Created a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal error check the server log!!
 */
router.get("/users/id/:id", userController.getUserById);

/**
 * @swagger
 * /users/email:
 *   get:
 *     summary: get user by email
 *     description: fetchs user with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: yohannes@hightech.com
 *     responses:
 *       '200':
 *         description: fetched user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal error check the server log!!
 */
router.get("/users/email", userController.getUserByEmail);

/**
 * @swagger
 * /users/username:
 *   get:
 *     summary: Get user by username
 *     description: gets user with the provided information
 *     parameters:
 *       - name: username
 *         in: query
 *         description: The username of the user to retrive
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Created a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal error check the server log!!
 */
router.get("/users/username", userController.getUserByUserName);

//resource controller
router.post("/create", resourceController.create);
router.get("/id/:id", resourceController.getResourceById);
router.get("/user/:userId", resourceController.getResourceByUserId);
router.get("/search", resourceController.searchResources);
router.get("/department/:department", resourceController.getResourceByDepartment);
router.delete("/id/:id", resourceController.deleteResource);

module.exports = router;