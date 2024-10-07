import express from "express"
import {
	createUser,
	getUsers,
	updateUser,
	deleteUser,
} from "../controllers/userController.js"

const router = express.Router()

router.post("/", createUser)
router.get("/", getUsers)
router.put("/:id_user", updateUser)
router.delete("/:id_user", deleteUser)

export default router
