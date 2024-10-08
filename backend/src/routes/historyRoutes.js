import express from "express"
import {getHistory} from "../controllers/historyController.js"

const historyRouter = express.Router()

historyRouter.get("/", getHistory)

export default historyRouter
