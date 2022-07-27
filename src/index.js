import store from 'app/store'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

import { HelmetProvider } from 'react-helmet-async'
import {
	AppContextProvider,
	DataProvider,
	ReactQueryContextProvider,
	ReactRouterContextProvider,
	UserContextProvider,
} from 'contexts/index.js'
import NotistackWrapper from 'NotistackWrapper'

const app = (
	<Provider store={store}>
		<ReactRouterContextProvider>
			<HelmetProvider>
				<ReactQueryContextProvider>
					<AppContextProvider>
						<NotistackWrapper>
							<UserContextProvider>
								<DataProvider>
									<App />
								</DataProvider>
							</UserContextProvider>
						</NotistackWrapper>
					</AppContextProvider>
				</ReactQueryContextProvider>
			</HelmetProvider>
		</ReactRouterContextProvider>{' '}
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'))
serviceWorker.unregister()
