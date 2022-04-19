import { BrowserRouter as Router } from 'react-router-dom'

export function ReactRouterContextProvider({ children }) {
	return <Router>{children}</Router>
}
