import express from "express"
import {createAdmin, getAdmins} from "../controllers/adminController.js"

const adminRoutes = express.Router()

adminRoutes.post("/", createAdmin)

adminRoutes.get("/", getAdmins)

export default adminRoutes
