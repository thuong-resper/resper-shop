import { AppBar, Box, Grid } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import SeeMoreButtonMobile from 'components/Button/SeeMoreButtonMobile/SeeMoreButtonMobile.js'
import Product from 'components/Products/Product/Product.js'
import SkeletonProduct from 'components/Products/Product/Skeleton/SkeletonProduct.js'
import ProductsSlider from 'components/ReactSlickSlider/ProductsSlider.js'
import { AntTab, AntTabs } from 'components/Tab/Tab.js'
import { getListProducts } from 'features/Product/pathApi.js'
import useWindowDimensions from 'hooks/useWindowDimensions.js'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PremiumWatchSub as subs } from '../../StaticParam.js'
import img from '../Images/DHCaocapDesk-330x428.png'
import img1 from '../Images/DHCaocapmobile2x-720x240-1.jpg'
import './styles.css'

const category = '61376edaa8d3c977efbcfa08' //fashion watches

const PremiumWatch = () => {
	const dispatch = useDispatch()
	const { width } = useWindowDimensions()
	const [value, setValue] = useState(0)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [sub, setSub] = useState(subs[0]._id)

	const actionGetListProducts = (params) => dispatch(getListProducts(params))
	useEffect(() => {
		const params = {
			category: category,
			subs: sub,
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
	}, [dispatch, category, sub])

	const handleChange = (event, newValue) => {
		for (let i = 0; i < subs.length; i++) {
			if (subs[i].index === newValue) {
				setSub(subs[i]._id)
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
								{subs.map((c) => (
									<SeeMoreButtonMobile
										key={c.index}
										title={c.index === value ? `Đồng hồ cao cấp ${c.name}` : null}
										link={c.index === value ? `products?category=${category}&subs=${c._id}` : null}
									/>
								))}
							</Grid>
						</>
					) : (
						<>
							{data.map((item, index) => (
								<TabPanel className="tab-panel" value={value} index={index} key={index}>
									{subs.map((c) => (
										<Link
											key={c.index}
											to={`products?category=${category}&subs=${c._id}`}
											className="seemore"
										>
											{c.index === value ? (
												<span>
													Xem thêm Đồng hồ cao cấp&nbsp;<strong>{`${c.name}`}</strong>
												</span>
											) : null}
										</Link>
									))}
									<div className="list-item list-top-ten">
										{loading ? (
											<Box display="flex" justify="space-between">
												{[...Array(4)].map((item, index) => (
													<Box width="25%">
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
			<div className="watch-type premium-section">
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
									{subs.map((c) => (
										<AntTab key={c.index} label={c.name} />
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

export default PremiumWatch
