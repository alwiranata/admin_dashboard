import DashboardIcon from "@mui/icons-material/Dashboard"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import RestorePageIcon from "@mui/icons-material/RestorePage"

export const NAVIGATION = [
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
		segment: "History",
		title: "History",
		icon: <RestorePageIcon />,
	},
	{
		kind: "divider",
	},
]
