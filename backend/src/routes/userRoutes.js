import express from "express"
import {
	createUser,
	getUsers,
	updateUser,
	deleteUser,
} from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/", createUser)
userRouter.get("/", getUsers)
userRouter.put("/:id_user", updateUser)
userRouter.delete("/:id_user", deleteUser)

export default userRouter
