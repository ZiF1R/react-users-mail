const Router = require('express');
const router = new Router();
const userController = require("../controllers/user.conroller");

router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.get("/users/:id/messages/from", userController.getUserMessages);
router.post("/users/:receiver_id/messages/from", userController.sendMessage);
router.get("/users/:id/messages/from/:sender_id", userController.getMessagesFromUser);

module.exports = router;