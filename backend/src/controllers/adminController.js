import Admin from "../models/Admin.js"

export const createAdmin = async (req, res) => {
	const {name, username} = req.body
	try {
		const newAdmin = await Admin.create({name, username})
		res
			.status(201)
			.json({message: "Admin created successfully", data: newAdmin})
	} catch (error) {
		res.status(500).json({error: "Failed to create admin"})
	}
}
