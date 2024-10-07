import History from "../models/History.js"

export const getHistory = async (req, res) => {
	try {
		const history = await History.findAll()
		res.json(history)
	} catch (error) {
		res.status(500).json({error: "Failed to fetch history"})
	}
}
