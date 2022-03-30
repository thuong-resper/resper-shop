import CssBaseline from '@material-ui/core/CssBaseline'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { UserContext } from 'contexts/UserContext'
import TimeLoadingToRedirect from 'pages/TimeLoadingToRedirect'
import React, { Suspense, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import SimpleBackdrop from './components/Backdrop/Backdrop'
import './global.css'
import pageAdmin from './pages/AdminPage/routesAdmin'
import NotFound from './pages/NotFound/NotFound'
import pageUser from './pages/routes'

const App = () => {
	const state = useContext(UserContext)
	const isAdmin = useSelector((state) => state.user.isAdmin)
	const [token] = state.token

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

	// useEffect
	useEffect(() => {
		AOS.init({
			duration: 300,
			once: true,
			initClassName: 'aos-init',
		})
	}, [])

	return (
		<Router>
			<CssBaseline />
			<Suspense fallback={<SimpleBackdrop />}>
				<Switch>
					{showPageUser(pageUser)}
					{isAdmin && token && showPageAdmin(pageAdmin)}
					<Route path="*" component={NotFound} exact />
					<Redirect to="/" from="/" />
				</Switch>
			</Suspense>
			{/*<MessengerCustomerChat pageId="972426273088823" appId="461020245337447" />*/}
		</Router>
	)
}

export default App
