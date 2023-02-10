const express = require("express");
const router = express.Router();
const { getContact, getContatcById ,createContact,updateContact,deleteContact} = require('../Controllers/contactController')

router.route("/").get(getContact);
router.route("/:id").get(getContatcById);
router.route("/").post(createContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

module.exports = router;