import { usePayPalScriptReducer } from '@paypal/react-paypal-js'

const ButtonWrapper = ({ currency, showSpinner, amount }) => {
	const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

	return <>{showSpinner && isPending && <div className="spinner" />}</>
}
