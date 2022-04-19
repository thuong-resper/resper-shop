import { AppBar, Box, Grid } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import SeeMoreButtonMobile from 'components/Button/SeeMoreButtonMobile/SeeMoreButtonMobile.js'
import Product from 'components/Products/Product/Product.js'
import SkeletonProduct from 'components/Products/Product/Skeleton/SkeletonProduct.js'
import ProductsSlider from 'components/ReactSlickSlider/ProductsSlider.js'
import { AntTabBlack, AntTabs } from 'components/Tab/Tab.js'
import { getListProducts } from 'features/Product/pathApi.js'
import useWindowDimensions from 'hooks/useWindowDimensions.js'
import 'pages/HomePage/styles.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ManWatch as fetchedCategories } from '../../StaticParam.js'
import img1 from '../Images/DHNammobile-720x240.jpg'
import img from '../Images/DHphaimanh-330x428.png'

const ManWatch = () => {
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
			sex: 'man',
			limit: 15,
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
								{/* button see more on mobile */}
								{fetchedCategories.map((c) => (
									<SeeMoreButtonMobile
										key={c.index}
										title={c.index === value ? `${c.label} nam` : null}
										link={c.index === value ? `products?category=${c.id}&sex=${c.sex}` : null}
									/>
								))}
							</Grid>
						</>
					) : (
						<>
							{data.map((item, index) => (
								<TabPanel className="tab-panel" value={value} index={index} key={index}>
									{fetchedCategories.map((c) => (
										<Link
											key={c.index}
											to={`products?category=${c.id}&sex=${c.sex}`}
											className="seemore"
										>
											{c.index === value ? (
												<span>
													Xem thêm&nbsp;<strong>{`${c.label} nam`}</strong>
												</span>
											) : null}
										</Link>
									))}
									<div className="list-item list-top-ten">
										{loading ? (
											<Box display="flex" justify="space-between">
												{[...Array(4)].map((item, index) => (
													<Box width="25%" key={index}>
														<SkeletonProduct />
													</Box>
												))}
											</Box>
										) : (
											<ProductsSlider data={data} slidesToShow={4} />
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
			<div className="watch-type premium-section watchforman">
				<div className="premium-type">
					<Link to="/premium-products">
						<img src={width > 1024 ? img : img1} alt="premium-products" />
					</Link>
				</div>
				<aside>
					<div className="skeleton-p skeleton-p-pre">
						<div className="tab">
							<AppBar position="static" className="app-bar">
								<AntTabs
									value={value}
									onChange={handleChange}
									indicatorColor="primary"
									scrollButtons="on"
									textColor="primary"
									variant="scrollable"
									aria-label="scrollable auto tabs example"
								>
									{fetchedCategories.map((c) => (
										<AntTabBlack key={c.index} label={c.label} />
									))}
								</AntTabs>
							</AppBar>
							{showListProducts(data)}
						</div>
					</div>
				</aside>
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
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
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

export default ManWatch
