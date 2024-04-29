const express = require('express');
// const { checkSchema } = require("express-validator");

const router = express.Router();

const MessageControl = require('../../../controllers/api/v1/Message');
// const UserSchema = require("../../../schema-validation/User");
// const ErrorHandleHelper = require("../../../models/helpers/ErrorHandleHelper");

router.post('/', MessageControl.newMessage);
router.get('/:id', MessageControl.getAll);
module.exports = router;
