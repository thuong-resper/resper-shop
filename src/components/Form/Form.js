import React from 'react'

export const Form = ({ children, ...props }) => {
	return (
		<form
			{...props}
			style={{
				width: '100%',
			}}
			noValidate
		>
			{children}
		</form>
	)
}
