const express = require("express");

const UsersController = require("../controllers/users");
const tokenChecker = require("../middleware/tokenChecker");
const upload = require("../middleware/multer");

const router = express.Router();
router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.create);
router.get("/getOneUser", tokenChecker, UsersController.getOneUser);

// router.get("/profile", UsersController.getOneUser)
// router.get("/profile:{userid}", UsersController.getOneUser) 

router.post("/friends", tokenChecker, UsersController.addFriend);
router.delete("/friends", tokenChecker, UsersController.removeFriend);

router.post("/profilePicture", tokenChecker, upload.single("profilePicture"), UsersController.addProfilePicture);
// router.delete("/profilePicture", tokenChecker, UsersController.removeProfilePicture);


module.exports = router;

