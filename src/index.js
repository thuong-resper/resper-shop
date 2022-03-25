import store from 'app/store'
import { DataProvider } from 'contexts/DataContext'
import { UserContextProvider } from 'contexts/UserContext'
import NotistackWrapper from 'NotistackWrapper'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

import { HelmetProvider } from 'react-helmet-async'

const app = (
	<Provider store={store}>
		<HelmetProvider>
			<NotistackWrapper>
				<DataProvider>
					<UserContextProvider>
						<App />
					</UserContextProvider>
				</DataProvider>
			</NotistackWrapper>
		</HelmetProvider>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'))
serviceWorker.unregister()
