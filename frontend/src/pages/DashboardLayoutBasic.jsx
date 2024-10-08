import AppProviderWrapper from "../AppProvider/AppProviderWrapper"
import PropTypes from "prop-types"

function DashboardLayoutBasic(props) {
	const {window} = props

	return <AppProviderWrapper window={window} />
}

DashboardLayoutBasic.propTypes = {
	window: PropTypes.func,
}

export default DashboardLayoutBasic
