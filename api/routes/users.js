const express = require("express");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");

const router = express.Router();
router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.create);

router.get("/profile", UsersController.getOneUser)
router.get("/profile:{userid}", UsersController.getOneUser)

router.post("/friends", tokenChecker, UsersController.addFriend);
router.delete("/friends", tokenChecker, UsersController.removeFriend);
router.delete("/friends/deny", tokenChecker, UsersController.denyFriend);

module.exports = router;

