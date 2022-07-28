import CssBaseline from '@material-ui/core/CssBaseline'
import AOS from 'aos'
import 'aos/dist/aos.css'
import TimeLoadingToRedirect from 'pages/TimeLoadingToRedirect'
import React, { Suspense, useContext, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SimpleBackdrop from './components/Backdrop/Backdrop'
import './global.css'
import NotFound from './pages/NotFound/NotFound'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import UserPage from 'pages/routes'
import { UserContext } from 'contexts'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MessengerCustomerChat from 'react-messenger-customer-chat'

const App = () => {
	const state = useContext(UserContext)
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

	const paypalOptions = {
		'client-id': 'test',
		currency: 'USD',
		intent: 'capture',
		'data-client-token': token,
	}

	return (
		<PayPalScriptProvider deferLoading={true} options={paypalOptions}>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<CssBaseline />
				<div>
					<Suspense fallback={<SimpleBackdrop />}>
						<Switch>
							{showPageUser(UserPage)}
							<Route path="*" component={NotFound} exact />
							<Redirect to="/" from="/" />
						</Switch>
					</Suspense>
					<MessengerCustomerChat
						pageId={process.env.REACT_APP_PAGE_ID}
						appId={process.env.REACT_APP_APP_ID}
					/>
				</div>
			</MuiPickersUtilsProvider>
		</PayPalScriptProvider>
	)
}

export default App
