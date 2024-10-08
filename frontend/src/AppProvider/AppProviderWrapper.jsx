import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/Layout"
import {demoTheme} from "../theme/DemoTheme"

function AppProviderWrapper({window}) {
	const [pathname, setPathname] = React.useState("/dashboard")

	const router = React.useMemo(() => {
		return {
			pathname,
			searchParams: new URLSearchParams(),
			navigate: (path) => setPathname(String(path)),
		}
	}, [pathname])

	return (
		<Layout
			window={window}
			pathname={pathname}
			theme={demoTheme}
			router={router}
		/>
	)
}
AppProviderWrapper.propTypes = {
	window: PropTypes.func,
}
export default AppProviderWrapper
