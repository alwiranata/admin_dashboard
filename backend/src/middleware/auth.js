// Placeholder for future authentication middleware
export const auth = (req, res, next) => {
	req.adminId = 4 // Example admin ID, replace with actual authentication logic
	next()
}
