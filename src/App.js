import CssBaseline from '@material-ui/core/CssBaseline'
import AOS from 'aos'
import 'aos/dist/aos.css'
import TimeLoadingToRedirect from 'pages/TimeLoadingToRedirect'
import React, { Suspense, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import SimpleBackdrop from './components/Backdrop/Backdrop'
import './global.css'
import NotFound from './pages/NotFound/NotFound'
import { UserContext } from 'contexts/index.js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import AdminPage from 'pages/AdminPage/routesAdmin.js'
import UserPage from 'pages/routes.js'

const App = () => {
	const state = useContext(UserContext)
	const isAdmin = useSelector((state) => state.user.isAdmin)
	const [token] = state.token

	useEffect(() => {
		AOS.init({
			duration: 300,
			once: true,
			initClassName: 'aos-init',
		})
	}, [])

	const showPageUser = (page) => {
		if (page.length > 0) {
			return page.map((page, index) => (
				<Route key={index} exact={page.exact} path={page.path} component={page.main} />
			))
		} else {
			return <TimeLoadingToRedirect />
		}
	}

	const showPageAdmin = (page) => {
		if (page.length > 0) {
			return page.map((page, index) => (
				<Route
					key={index}
					exact={page.exact}
					path={page.path}
					component={isAdmin && token ? page.main : NotFound}
				/>
			))
		}
	}

	const paypalOptions = {
		'client-id': 'test',
		currency: 'USD',
		intent: 'capture',
		'data-client-token': token,
	}

	return (
		<PayPalScriptProvider deferLoading={true} options={paypalOptions}>
			<CssBaseline />
			<Suspense fallback={<SimpleBackdrop />}>
				<Switch>
					{showPageUser(UserPage)}
					{isAdmin && token && showPageAdmin(AdminPage)}
					<Route path="*" component={NotFound} exact />
					<Redirect to="/" from="/" />
				</Switch>
			</Suspense>
			{/*<MessengerCustomerChat pageId="972426273088823" appId="461020245337447" />*/}
		</PayPalScriptProvider>
	)
}

export default App
