import * as React from "react"
import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {createTheme} from "@mui/material/styles"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import RestorePageIcon from "@mui/icons-material/RestorePage"
import {AppProvider} from "@toolpad/core/AppProvider"
import DashboardIcon from "@mui/icons-material/Dashboard"
import {DashboardLayout} from "@toolpad/core/DashboardLayout"

const NAVIGATION = [
	{
		kind: "header",
		title: "Menu",
	},
	{
		segment: "Dashboard",
		title: "Dashboard",
		icon: <DashboardIcon />,
	},
	{
		segment: "Admin",
		title: "Admin",
		icon: <ManageAccountsIcon />,
	},
	{
		segment: "Users",
		title: "Users",
		icon: <GroupAddIcon />,
	},
	{
		segment: "Histroy",
		title: "Histroy",
		icon: <RestorePageIcon />,
	},
	{
		kind: "divider",
	},
]

const demoTheme = createTheme({
	cssVariables: {
		colorSchemeSelector: "data-toolpad-color-scheme",
	},
	colorSchemes: {light: true, dark: true},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536,
		},
	},
})

function DemoPageContent({pathname}) {
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
			<Typography>Dashboard content for {pathname}</Typography>
		</Box>
	)
}

DemoPageContent.propTypes = {
	pathname: PropTypes.string.isRequired,
}

function DashboardLayoutBasic(props) {
	const {window} = props

	const [pathname, setPathname] = React.useState("/dashboard")

	const router = React.useMemo(() => {
		return {
			pathname,
			searchParams: new URLSearchParams(),
			navigate: (path) => setPathname(String(path)),
		}
	}, [pathname])

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

DashboardLayoutBasic.propTypes = {
	window: PropTypes.func,
}

export default DashboardLayoutBasic
