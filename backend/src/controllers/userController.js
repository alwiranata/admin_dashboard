import User from "../models/User.js"
import History from "../models/History.js"

export const createUser = async (req, res) => {
	const {name, email} = req.body

	const existingUser = await User.findOne({where: {email: email}})
	if (existingUser) {
		return res.status(400).json({message: "Email sudah terdaftar"})
	}

	try {
		const newUser = await User.create({
			name: name,
			email: email,
			createdAt: new Date(),
			updatedAt: new Date(),
		})

		await History.create({
			action: "User Created",
			user_id: newUser.id_user,
			admin_id: req.adminId,
			createdAt: new Date(),
		})

		return res.status(201).json(newUser)
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			return res.status(400).json({message: "Email sudah terdaftar"})
		}
		console.error("Error creating user:", error)
		return res.status(500).json({message: "Error creating user", error})
	}
}

export const getUsers = async (req, res) => {
	try {
		const users = await User.findAll()
		res.json(users)
	} catch (error) {
		res.status(500).json({error: "Failed to fetch users"})
	}
}

export const updateUser = async (req, res) => {
	const {id_user} = req.params
	const {name, email} = req.body
	try {
		const user = await User.findByPk(id_user)
		if (!user) {
			return res.status(404).json({error: "User not found"})
		}
		user.name = name
		user.email = email
		await user.save()
		await History.create({
			admin_id: req.adminId,
			user_id: user.id_user,
			action: "User Update",
		})
		res.json({message: "User updated successfully", data: user})
	} catch (error) {
		res.status(500).json({error: "Failed to update user"})
	}
}

export const deleteUser = async (req, res) => {
	const {id_user} = req.params
	try {
		const user = await User.findByPk(id_user)
		if (!user) {
			return res.status(404).json({error: "User not found"})
		}
		await user.destroy()

		try {
			await History.create({
				admin_id: req.adminId,
				user_id: id_user,
				action: "delete",
			})
		} catch (historyError) {
			console.error("Error creating history entry:", historyError)
		}

		res.status(201).json({message: "User deleted successfully"})
	} catch (error) {
		res.status(500).json({error: "Failed to delete user"})
	}
}
