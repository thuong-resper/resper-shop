import { AppBar, Box, Grid } from '@material-ui/core'
import SeeMoreButtonMobile from 'components/Button/SeeMoreButtonMobile/SeeMoreButtonMobile'
import Product from 'components/Products/Product/Product'
import SkeletonProduct from 'components/Products/Product/Skeleton/SkeletonProduct'
import ProductsSlider from 'components/ReactSlickSlider/ProductsSlider.js'
import { AntTab, AntTabs } from 'components/Tab/Tab'
import useWindowDimensions from 'hooks/useWindowDimensions'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import { useGetListProductsHome } from 'features/Product/index.js'
import SimpleBackdrop from 'components/Backdrop/Backdrop.js'

const TopProducts = ({ fetchedCategories, sort, limit }) => {
	const { width } = useWindowDimensions()
	const [value, setValue] = useState(0)
	const [category, setCategory] = useState(fetchedCategories[0].id)

	const params = {
		category: category,
		sort: sort ? sort : '-sold', // high order
		limit: width < 600 ? 4 : limit ? limit : 10,
	}
	const { status, data, error, isFetching } = useGetListProductsHome(params)

	const handleChange = (event, newValue) => {
		for (let i = 0; i < fetchedCategories.length; i++) {
			if (fetchedCategories[i].index === newValue) {
				setCategory(fetchedCategories[i].id)
			}
		}
		setValue(newValue)
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
					<div>
						{width < 600 ? (
							<div>
								{status === 'loading' ? (
									<Grid container justify="flex-start">
										<>
											{[...Array(4)].map((item, index) => (
												<Grid item xs={6} key={index}>
													<SkeletonProduct />
												</Grid>
											))}
										</>
									</Grid>
								) : status === 'error' ? (
									<span>Error: {error.message}</span>
								) : (
									<Grid container justify="flex-start">
										{data.data.slice(0, 4).map((item, index) => (
											<Grid item xs={6} key={index}>
												<Product product={item} />
											</Grid>
										))}
									</Grid>
								)}
								{isFetching ? <SimpleBackdrop /> : null}
								{fetchedCategories.map((c) => (
									<SeeMoreButtonMobile
										key={c.index}
										title={c.index === value ? c.label : null}
										link={c.index === value ? `shop?category=${c.id}` : null}
									/>
								))}
							</div>
						) : (
							<div>
								{status === 'loading' ? (
									<div className="list-item list-top-ten">
										<Box display="flex" justify="space-between" mx={1}>
											{[...Array(5)].map((item, index) => (
												<Box width="20%" key={index}>
													<SkeletonProduct />
												</Box>
											))}
										</Box>
									</div>
								) : (
									<>
										{status === 'error' ? (
											<span>Error: {error.message}</span>
										) : (
											<>
												{data.data.map((item, index) => (
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
															<ProductsSlider data={data.data} />
														</div>
													</TabPanel>
												))}
												<div>{isFetching ? 'Background Comment Updating...' : ' '}</div>
											</>
										)}
									</>
								)}
							</div>
						)}
					</div>
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
