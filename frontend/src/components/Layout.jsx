import {AppProvider} from "@toolpad/core/AppProvider"
import {DashboardLayout} from "@toolpad/core/DashboardLayout"
import {NAVIGATION} from "./DashboardNavigation"
import {Logo} from "./Logo"
import {DemoPageContent} from "./DemoPageContent"
import PropTypes from "prop-types"

function Layout({window, pathname, theme, router}) {
	const demoWindow = window !== undefined ? window() : undefined

	return (
		<AppProvider
			navigation={NAVIGATION}
			branding={{
				logo: <Logo />,
				title: "Admin Dashboard",
			}}
			router={router}
			theme={theme}
			window={demoWindow}
		>
			<DashboardLayout>
				<DemoPageContent pathname={pathname} />
			</DashboardLayout>
		</AppProvider>
	)
}

Layout.propTypes = {
	window: PropTypes.func,
	pathname: PropTypes.string.isRequired,
	theme: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
}

export default Layout
