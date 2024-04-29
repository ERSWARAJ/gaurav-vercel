const express = require('express');
// const { checkSchema } = require("express-validator");

const router = express.Router();

const ConversationControl = require('../../../controllers/api/v1/Conversation');
// const UserSchema = require("../../../schema-validation/User");
// const ErrorHandleHelper = require("../../../models/helpers/ErrorHandleHelper");

router.post('/', ConversationControl.newConversation);
router.get('/', ConversationControl.getAll);
router.get('/:id', ConversationControl.getOne);
module.exports = router;
