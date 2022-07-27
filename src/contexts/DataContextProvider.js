import React, { createContext, useContext, useState } from 'react'

const DataContextProvider = createContext()

export const DataProvider = ({ children }) => {
	const [data, setData] = useState({})

	const setValues = (values) => {
		setData((prevData) => ({
			...prevData,
			...values,
		}))
	}

	return (
		<DataContextProvider.Provider value={{ data, setValues }}>
			{children}
		</DataContextProvider.Provider>
	)
}

export const useData = () => useContext(DataContextProvider)
