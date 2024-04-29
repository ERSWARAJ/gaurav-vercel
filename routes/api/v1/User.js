const express = require('express');
// const { checkSchema } = require("express-validator");

const router = express.Router();

const UserControl = require('../../../controllers/api/v1/User');
// const UserSchema = require("../../../schema-validation/User");
// const ErrorHandleHelper = require("../../../models/helpers/ErrorHandleHelper");
const AuthHandler = require('../../../models/helpers/AuthHelper');

router.post('/sign-up', UserControl.signup);
router.post('/login', UserControl.login);
router.get('/', AuthHandler.authenticateJWT(), UserControl.getUser);
module.exports = router;
