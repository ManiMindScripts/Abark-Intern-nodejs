const express = require("express")
const {streamFile} = require("../controllers/fileController")

const router = express.Router()
router.get("/read",streamFile)

module.exports = router