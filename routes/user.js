const express = require("express")
const router = express.Router()

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} = require("../controllers/User")

router.post("/createUser", createUser)
router.get("/getAllUsers", getAllUsers)
router.get("/getUserById/:id", getUserById)
router.patch("/updateUserById/:id", updateUserById)
router.delete("/deleteUserById/:id", deleteUserById)

module.exports = router
