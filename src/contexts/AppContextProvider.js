import { createContext, useState } from 'react'

export const AppContext = createContext(null)

export function AppContextProvider({ children }) {
	const [flashMessage, setFlashMessage] = useState('')
	const contextValue = { flashMessage, setFlashMessage }

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
