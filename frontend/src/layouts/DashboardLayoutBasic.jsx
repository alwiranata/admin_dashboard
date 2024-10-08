import * as React from "react"
import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {createTheme} from "@mui/material/styles"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PersonIcon from "@mui/icons-material/Person"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import {AppProvider} from "@toolpad/core/AppProvider"
import {DashboardLayout} from "@toolpad/core/DashboardLayout"
import axios from "axios"
import AddIcon from "@mui/icons-material/Add"

import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Modal,
	TextField,
} from "@mui/material"

const NAVIGATION = [
	{segment: "ADMIN", title: "Admin", icon: <AdminPanelSettingsIcon />},
	{segment: "USERS", title: "Users", icon: <PersonIcon />},
	{segment: "HISTORY", title: "History", icon: <DashboardIcon />},
]

const demoTheme = createTheme({
	cssVariables: {
		colorSchemeSelector: "data-toolpad-color-scheme",
	},
	colorSchemes: {light: true, dark: true},
})

function DemoPageContent({pathname}) {
	const [data, setData] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(null)
	const [open, setOpen] = React.useState(false)
	const [createOpen, setCreateOpen] = React.useState(false)
	const [currentUser, setCurrentUser] = React.useState(null)
	const [newUser, setNewUser] = React.useState({name: "", email: ""})

	React.useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			setError(null)

			try {
				let response
				if (pathname === "/USERS") {
					response = await axios.get("http://localhost:3000/api/users")
				} else if (pathname === "/HISTORY") {
					response = await axios.get("http://localhost:3000/api/history")
				} else if (pathname === "/ADMIN") {
					response = await axios.get("http://localhost:3000/api/admin")
				}

				if (response && response.data) {
					setData(response.data)
				}
			} catch (err) {
				console.error("Error fetching data:", err)
				setError("Error fetching data")
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [pathname])

	const handleEdit = (user) => {
		setCurrentUser(user)
		setOpen(true)
	}

	const handleDelete = async (userId) => {
		try {
			await axios.delete(`http://localhost:3000/api/users/${userId}`)
			setData((prevData) => prevData.filter((user) => user.id_user !== userId))
			console.log(`Deleted user with ID: ${userId}`)
		} catch (err) {
			console.error("Error deleting user:", err)
			setError("Error deleting user")
		}
	}

	const handleModalClose = () => {
		setOpen(false)
		setCurrentUser(null)
	}

	const handleCreateModalClose = () => {
		setCreateOpen(false)
		setNewUser({name: "", email: ""}) // Reset form
	}

	const handleUpdateUser = async () => {
		if (!currentUser) return

		try {
			const response = await axios.put(
				`http://localhost:3000/api/users/${currentUser.id_user}`,
				currentUser
			)

			// Update the local state with the updated user data
			setData((prevData) =>
				prevData.map((user) =>
					user.id_user === response.data.id_user ? response.data : user
				)
			)
			handleModalClose() // Close the modal after successful update
		} catch (err) {
			console.error("Error updating user:", err)
			setError("Error updating user")
		}
	}

	const handleCreateUser = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3000/api/users",
				newUser
			)
			setData((prevData) => [...prevData, response.data])
			handleCreateModalClose()
		} catch (err) {
			console.error("Error creating user:", err)
			setError("Error creating user")
		}
	}

	return (
		<Box
			sx={{
				py: 4,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
			}}
		>
			{loading && <Typography>Loading...</Typography>}
			{error && <Typography color='error'>{error}</Typography>}
			<Typography variant='h4'>{pathname.replace("/", "")}</Typography>

			{pathname === "/USERS" && (
				<IconButton
					onClick={() => setCreateOpen(true)}
					sx={{
						mb: 2,
						position: "absolute",
						right: 16,
						bgcolor: "#1976d2", // Set background color to blue
						color: "white", // Set icon color to white
						"&:hover": {
							bgcolor: "gray", // Optional: Change color on hover
						},
					}}
				>
					<AddIcon />
				</IconButton>
			)}

			{/* Admins Table */}
			{pathname === "/ADMIN" && !loading && !error && (
				<TableContainer
					component={Paper}
					sx={{mt: 2, maxWidth: "1000px", margin: "auto"}}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell
									sx={{
										backgroundColor: "#1976d2",
										color: "white",
										fontWeight: "bold",
									}}
								>
									No
								</TableCell>
								<TableCell
									sx={{
										backgroundColor: "#1976d2",
										color: "white",
										fontWeight: "bold",
									}}
								>
									Name
								</TableCell>
								<TableCell
									sx={{
										backgroundColor: "#1976d2",
										color: "white",
										fontWeight: "bold",
									}}
								>
									Username
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((admin, index) => (
								<TableRow key={admin.id_admin}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{admin.name}</TableCell>
									<TableCell>{admin.username}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			{/* Users Table */}
			{pathname === "/USERS" && !loading && !error && (
				<TableContainer
					component={Paper}
					sx={{mt: 2, maxWidth: "1000px", margin: "auto"}}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell
									sx={{
										backgroundColor: "#1976d2",
										color: "white",
										fontWeight: "bold",
									}}
								>
									No
								</TableCell>
								<TableCell
									sx={{
										backgroundColor: "#1976d2",
										color: "white",
										fontWeight: "bold",
									}}
								>
									Name
								</TableCell>
								<TableCell
									sx={{
										backgroundColor: "#1976d2",
										color: "white",
										fontWeight: "bold",
									}}
								>
									Email
								</TableCell>
								<TableCell
									sx={{
										backgroundColor: "#1976d2",
										color: "white",
										fontWeight: "bold",
									}}
								>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((user, index) => (
								<TableRow key={user.id_user}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										<Button
											variant='outlined'
											onClick={() => handleEdit(user)}
											sx={{mr: 1}}
										>
											Edit
										</Button>
										<Button
											variant='outlined'
											color='error'
											onClick={() => handleDelete(user.id_user)}
										>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			<Modal
				open={open}
				onClose={handleModalClose}
			>
				<Box
					sx={{
						p: 4,
						bgcolor: "gary",
						width: 400,
						margin: "auto",
						mt: "100px",
						borderRadius: "8px",
						boxShadow: 24,
					}}
				>
					<Typography variant='h6'>Edit User</Typography>
					{currentUser && (
						<>
							<TextField
								label='Name'
								value={currentUser.name}
								onChange={(e) =>
									setCurrentUser({...currentUser, name: e.target.value})
								}
								fullWidth
								margin='normal'
								InputProps={{
									sx: {bgcolor: "primary"}, // Set gray background color
								}}
							/>
							<TextField
								label='Email'
								value={currentUser.email}
								onChange={(e) =>
									setCurrentUser({...currentUser, email: e.target.value})
								}
								fullWidth
								margin='normal'
								InputProps={{
									sx: {bgcolor: "primary"}, // Set gray background color
								}}
							/>
							<Button
								variant='contained'
								sx={{
									color: "white", // Set the text color to white
									bgcolor: "#1e88e5", // Set the background color
									"&:hover": {
										bgcolor: "#1565c0", // Optional: change color on hover
									},
									mt: 2,
								}}
								onClick={handleUpdateUser}
							>
								Update
							</Button>
						</>
					)}
				</Box>
			</Modal>

			{/* Create User Modal */}
			<Modal
				open={createOpen}
				onClose={handleCreateModalClose}
			>
				<Box
					sx={{
						p: 4,
						bgcolor: "gary",
						width: 400,
						margin: "auto",
						mt: "100px",
						borderRadius: "8px",
						boxShadow: 24,
					}}
				>
					<Typography variant='h6'>Create User</Typography>
					<TextField
						label='Name'
						value={newUser.name}
						onChange={(e) => setNewUser({...newUser, name: e.target.value})}
						fullWidth
						margin='normal'
						InputProps={{
							sx: {bgcolor: "primary"}, // Set gray background color
						}}
					/>
					<TextField
						label='Email'
						value={newUser.email}
						onChange={(e) => setNewUser({...newUser, email: e.target.value})}
						fullWidth
						margin='normal'
						InputProps={{
							sx: {bgcolor: "primary"}, // Set gray background color
						}}
					/>
					<Button
						variant='contained'
						sx={{
							color: "white", 
							bgcolor: "#1e88e5", 
							"&:hover": {
								bgcolor: "#1565c0", 
							},
							mt: 2,
						}}
						onClick={handleCreateUser}
					>
						Create
					</Button>
				</Box>
			</Modal>

			{/* History Table */}
			{pathname === "/HISTORY" && !loading && !error && (
				<TableContainer
					component={Paper}
					sx={{mt: 2, maxWidth: "1000px", margin: "auto"}}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell
									sx={{
										backgroundColor: "#1976d2",
										color: "white",
										fontWeight: "bold",
									}}
								>
									No
								</TableCell>
								<TableCell
									sx={{
										backgroundColor: "#1976d2",
										color: "white",
										fontWeight: "bold",
									}}
								>
									Admin ID
								</TableCell>
								<TableCell
									sx={{
										backgroundColor: "#1976d2",
										color: "white",
										fontWeight: "bold",
									}}
								>
									Action
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((history, index) => (
								<TableRow key={history.id_history}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{history.admin_id}</TableCell>
									<TableCell>{history.action}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Box>
	)
}

DemoPageContent.propTypes = {
	pathname: PropTypes.string.isRequired,
}

function DashboardLayoutBranding(props) {
	const {window} = props
	const [pathname, setPathname] = React.useState("/Welcome Admin")

	const router = React.useMemo(
		() => ({
			pathname,
			searchParams: new URLSearchParams(),
			navigate: (path) => setPathname(String(path)),
		}),
		[pathname]
	)

	const demoWindow = window !== undefined ? window() : undefined

	return (
		<AppProvider
			navigation={NAVIGATION}
			branding={{
				logo: (
					<img
						src='https://mui.com/static/logo.png'
						alt='Admin Dashboard'
					/>
				),
				title: "Admin Dashboard",
			}}
			router={router}
			theme={demoTheme}
			window={demoWindow}
		>
			<DashboardLayout>
				<DemoPageContent pathname={pathname} />
			</DashboardLayout>
		</AppProvider>
	)
}

DashboardLayoutBranding.propTypes = {
	window: PropTypes.func,
}

export default DashboardLayoutBranding
