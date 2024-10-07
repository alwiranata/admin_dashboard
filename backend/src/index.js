import express from "express"
import cors from "cors"
import {sequelize} from "./config/database.js"
import adminRoutes from "./routes/adminRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import historyRoutes from "./routes/historyRoutes.js"
import dotenv from "dotenv"
import {auth} from "./middleware/auth.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(auth) 

app.use("/api/admin", adminRoutes)
app.use("/api/users", userRoutes)
app.use("/api/history", historyRoutes)

app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`)
	try {
		await sequelize.authenticate()
		console.log("Database connected successfully.")
	} catch (error) {
		console.error("Unable to connect to the database:", error)
	}
})
