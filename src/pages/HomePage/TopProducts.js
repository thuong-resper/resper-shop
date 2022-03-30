import { AppBar, Box, Grid } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import SeeMoreButtonMobile from 'components/Button/SeeMoreButtonMobile/SeeMoreButtonMobile'
import Product from 'components/Products/Product/Product'
import SkeletonProduct from 'components/Products/Product/Skeleton/SkeletonProduct'
import ProductsSlider from 'components/ReactSlickSlider/ProductsSlider.js'
import { AntTab, AntTabs } from 'components/Tab/Tab'
import { getListProducts } from 'features/Product/pathApi'
import useWindowDimensions from 'hooks/useWindowDimensions'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './styles.css'

const TopProducts = ({ fetchedCategories, sort, limit }) => {
	const dispatch = useDispatch()
	const { width } = useWindowDimensions()
	const [value, setValue] = useState(0)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [category, setCategory] = useState(fetchedCategories[0].id)

	const actionGetListProducts = (params) => dispatch(getListProducts(params))
	useEffect(() => {
		const params = {
			category: category,
			sort: sort ? sort : '-sold', // high order
			limit: limit ? limit : 10,
		}
		const fetchDataProduct = async (params) => {
			try {
				setLoading(true)
				const product = await actionGetListProducts(params)
				const res = unwrapResult(product)
				if (res) {
					setData(res.data)
					setLoading(false)
				}
			} catch (err) {}
		}
		fetchDataProduct(params) // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, category])

	const handleChange = (event, newValue) => {
		for (let i = 0; i < fetchedCategories.length; i++) {
			if (fetchedCategories[i].index === newValue) {
				setCategory(fetchedCategories[i].id)
			}
		}
		setValue(newValue)
	}

	const showListProducts = (data) => {
		if (data.length > 0) {
			return (
				<>
					{width < 600 ? (
						<>
							<Grid container justify="flex-start">
								{data.slice(0, 4).map((item, index) => (
									<Grid item xs={6} key={index}>
										{loading ? <SkeletonProduct /> : <Product product={item} />}
									</Grid>
								))}
								{fetchedCategories.map((c) => (
									<SeeMoreButtonMobile
										key={c.index}
										title={c.index === value ? c.label : null}
										link={c.index === value ? `shop?category=${c.id}` : null}
									/>
								))}
							</Grid>
						</>
					) : (
						<>
							{data.map((item, index) => (
								<TabPanel className="tab-panel" value={value} index={index} key={index}>
									{fetchedCategories.map((c) => (
										<Link key={c.index} to={`shop?category=${c.id}`} className="seemore">
											{c.index === value ? (
												<span>
													Xem thêm&nbsp;<strong>{c.label}</strong>
												</span>
											) : null}
										</Link>
									))}
									<div className="list-item list-top-ten">
										{loading ? (
											<Box display="flex" justify="space-between">
												{[...Array(5)].map((item, index) => (
													<Box width="20%" key={index}>
														<SkeletonProduct />
													</Box>
												))}
											</Box>
										) : (
											<ProductsSlider data={data} />
										)}
									</div>
								</TabPanel>
							))}
						</>
					)}
				</>
			)
		}
	}
	return (
		<>
			<div className="skeleton-p skeleton-p-top products-slider-bgColor">
				<div className="tab">
					<AppBar position="static" className="app-bar">
						<AntTabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							aria-label="scrollable auto tabs example"
						>
							{fetchedCategories.map((c) => (
								<AntTab key={c.label} label={c.label} />
							))}
						</AntTabs>
					</AppBar>
					{showListProducts(data)}
				</div>
			</div>
		</>
	)
}

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	)
}

export default TopProducts
