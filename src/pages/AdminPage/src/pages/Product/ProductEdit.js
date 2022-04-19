import { makeStyles } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import { getparams } from 'features/Product/pathApi'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import FormProductEdit from './FormProductEdit'
import { AdminLayout } from 'components/Layout/index.js'
import SEO from 'components/SEO/SEO.js'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}))
export default function ProductEdit() {
	const dispatch = useDispatch()
	const classes = useStyles()
	const { id } = useRouteMatch().params
	//state
	const [valuesEdit, setValuesEdit] = useState([])
	// dispatch action
	const actionGetProduct = (id) => dispatch(getparams(id))
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
		const fetchDataProduct = async (id) => {
			const product = await actionGetProduct(id)
			const res = unwrapResult(product)
			if (res) {
				setValuesEdit(res)
			}
		}
		fetchDataProduct(id) // eslint-disable-next-line
	}, [])
	return (
		<AdminLayout>
			<SEO pageTitle={'Admin | Chỉnh sửa sản phẩm'} />
			<main className={classes.content}>
				<FormProductEdit id_product={id} valuesEdit={valuesEdit} />
			</main>
		</AdminLayout>
	)
}
