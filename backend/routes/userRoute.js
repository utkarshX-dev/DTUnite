const {Router} = require('express');
const router = Router();
const {login, register, sendUserInfo} = require('../controllers/userController.js');
router.get("/", sendUserInfo);
router.post("/login", login);
router.post("/register", register);
module.exports = router;