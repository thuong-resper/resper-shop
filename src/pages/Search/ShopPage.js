import { AppBar, Box, Drawer, Fab, Grid, makeStyles, Typography } from '@material-ui/core'
import ImageSearchIcon from '@material-ui/icons/ImageSearch'
import Pagination from '@material-ui/lab/Pagination'
import Product from 'components/Products/Product/Product'
import { AntTab, AntTabs } from 'components/Tab/Tab'
import { useFirstRender, useRouter, useWindowDimensions } from 'hooks'
import queryString from 'query-string'
import React, { useEffect, useMemo, useState } from 'react'
import SEO from 'components/SEO/SEO'
import { MainLayout } from 'components/Layout'
import { ProductFilterSidebar } from 'components/Filter/ProductFilterSidebar'
import { sortOptions } from 'staticOptions'
import { SkeletonFilterItem, SkeletonShopPageProduct } from 'components/Skeleton'
import { useForm } from 'react-hook-form'
import { useGetCategories, useGetCategorySubs } from 'features/Search'
import searchAPI from 'apis/searchAPI'
import { convertViToEn } from 'utils/convertViToEn'
import Iconify from 'components/Iconify'

const useStyles = makeStyles((theme) => ({
	titleSeeMore: {
		padding: '1rem 0',
		[theme.breakpoints.down('sm')]: {
			marginLeft: '0.5rem',
		},
	},
	appBar: { boxShadow: 'none', backgroundColor: '#fff' },
	filter: {
		padding: '1rem',
		width: 300,
	},
	minHeight: {
		height: '25.5rem',
		[theme.breakpoints.down('md')]: {
			height: '21.5rem',
		},
	},
}))

const ShopPage = ({ location }) => {
	const classes = useStyles()
	const { width } = useWindowDimensions()
	const router = useRouter()
	const items = 20
	const pathname = queryString.parse(router.location.search, { arrayFormat: 'comma' }) ?? null
	const query = pathname.query || ''
	const [state, setState] = useState({ right: false })
	const [filterData, setFilterData] = useState([])
	const [dataLength, setDataLength] = useState(0)
	const [loadingData, setLoadingData] = useState(false)
	const [errorData, setErrorData] = useState(null)
	const [page, setPage] = useState(Number(pathname.page) || 0)

	const defaultValues = {
		category: '',
		price: '',
		rating: '',
		subs: false,
		color: false,
		type: false,
		sc: false,
		ram: false,
		rom: false,
		res: false,
		cpu: false,
		sex: false,
		pin: false,
		face: false,
		...pathname,
	}

	const sortIdx = useMemo(() => {
		for (let i = 0; i < sortOptions.length; i++) {
			if (sortOptions[i].value === defaultValues.sort) {
				return i
			}
		}
	}, [defaultValues.sort])

	const [category, setCategory] = useState(defaultValues.category ?? '')
	const [sort, setSort] = useState(defaultValues.sort ?? sortOptions[0].value)
	const [sortValue, setSortValue] = useState(sortIdx ?? 0)

	const { isLoading: loadingCategory, data: categoryData } = useGetCategories()
	const { isLoading: loadingCategorySubs, data: subData } = useGetCategorySubs(
		category ? category : null
	)

	const { reset, control, setValue, getValues, watch } = useForm({ defaultValues })

	const data = watch()
	const categoryWatch = watch('category')
	const queryEng = query ? convertViToEn(query) : ''
	const filterParams = { ...data, sort, limit: items, query: queryEng, page }
	Object.keys(filterParams).forEach((key) => {
		// eslint-disable-next-line eqeqeq
		if (filterParams[key] == false || '') {
			delete filterParams[key]
		}
	})
	const params = queryString.stringify(filterParams, { arrayFormat: 'comma' })
	const url = `/shop?${params}`
	useEffect(() => {
		setLoadingData(true)
		searchAPI
			.getSearch(filterParams)
			.then((response) => {
				setLoadingData(false)
				setFilterData(response.data)
				setDataLength(response.total)
			})
			.catch((error) => {
				setErrorData(error)
				setLoadingData(false)
			})
		router.push(url)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, query])

	useFirstRender(() => {
		reset(defaultValues)
	}, [query])

	useFirstRender(() => {
		reset({
			...getValues(),
			subs: false,
			color: false,
			type: false,
			sc: false,
			ram: false,
			rom: false,
			res: false,
			cpu: false,
			sex: false,
			pin: false,
			face: false,
		})
	}, [category])

	const handleChangeCheckbox = (option, event, field, atr) => {
		let values = getValues(field) || []
		if (typeof values === 'string') {
			values = values.split()
		}
		values = values.filter((v) => v)
		let newValues = []
		if (event.target.checked) {
			newValues = [...(values ?? []), option[atr]]
		} else {
			newValues = values?.filter((value) => value !== option[atr])
		}
		setValue(field, newValues.join(','))
		return newValues
	}

	const handleChangeCategory = (value) => {
		if (value) {
			setCategory(value._id)
		}
	}

	const onChangePage = (page, newPage) => {
		setPage(newPage - 1)
		const pageChangeParams = {
			...filterParams,
			page: newPage - 1,
		}
		const params = queryString.stringify(pageChangeParams, { arrayFormat: 'comma' })
		const url = `/shop?${params}`
		router.push(url)
	}

	const toggleDrawer = (anchor, open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}
		setState({ ...state, [anchor]: open })
	}

	const handleChangeSort = (event, newValue) => {
		for (let i = 0; i < sortOptions.length; i++) {
			if (sortOptions[i].index === newValue) {
				setSort(sortOptions[i].value)
			}
		}
		setSortValue(newValue)
	}

	const showPagination = (length) => {
		return (
			<Pagination
				variant="outlined"
				shape="rounded"
				count={Math.ceil(length / items) - 1}
				page={page + 1}
				onChange={onChangePage}
			/>
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
					<Box p="24px 0">
						<div>{children}</div>
					</Box>
				)}
			</div>
		)
	}

	const showListProducts = (data) => {
		if (data.length > 0) {
			return (
				<>
					{data.map((item, index) => (
						<TabPanel className="tab-panel" value={sortValue} index={index} key={index}>
							<Grid container direction="row" justify="flex-start" alignItems="center">
								{data?.map((listProduct) => (
									<Grid
										item
										xs={6}
										sm={4}
										md={3}
										key={listProduct._id}
										className={classes.minHeight}
									>
										<Product product={listProduct} />
									</Grid>
								))}
							</Grid>
							{dataLength > items && (
								<Box mt={2} display="flex" justifyContent="center">
									{showPagination(dataLength)}
								</Box>
							)}
						</TabPanel>
					))}
				</>
			)
		}
	}

	const list = (anchor) => (
		<div onKeyDown={toggleDrawer(anchor, false)}>
			<Box className={classes.filter}>
				<ProductFilterSidebar
					query={query}
					control={control}
					categoryData={categoryData}
					handleChangeCategory={handleChangeCategory}
					subData={subData}
					handleChangeCheckbox={handleChangeCheckbox}
					defaultValues={defaultValues}
					categoryWatch={categoryWatch}
					reset={reset}
				/>
			</Box>
		</div>
	)

	if (errorData) return 'Error: ' + errorData.message

	return (
		<MainLayout>
			<SEO
				pageTitle={'Resper shop | Tìm kiếm sản phẩm'}
				pageDescription={'Resper shop | Tìm kiếm sản phẩm'}
				pageUrl={`${process.env.REACT_APP_CLIENT_URL}`}
			/>
			<Grid container spacing={2}>
				{width > 600 ? (
					<>
						<Grid item sm={3}>
							{loadingCategory || loadingCategorySubs ? (
								[...Array(6)].map((item, idx) => <SkeletonFilterItem key={idx} />)
							) : (
								<ProductFilterSidebar
									query={query}
									control={control}
									categoryData={categoryData}
									handleChangeCategory={handleChangeCategory}
									subData={subData}
									handleChangeCheckbox={handleChangeCheckbox}
									defaultValues={defaultValues}
									categoryWatch={categoryWatch}
									reset={reset}
								/>
							)}
						</Grid>
					</>
				) : (
					<>
						<Fab
							size="small"
							color="secondary"
							onClick={toggleDrawer('right', true)}
							style={{
								position: 'absolute',
								bottom: 16,
								right: 16,
								zIndex: 3,
							}}
						>
							<Iconify icon={'ci:filter-outline'} width="1.5rem" height="1.5rem" />
						</Fab>
						<Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
							{list('right')}
						</Drawer>
					</>
				)}
				<Grid item xs={12} sm={9}>
					{loadingData ? (
						<SkeletonShopPageProduct />
					) : (
						<>
							{filterData?.length > 0 ? (
								<>
									{query && (
										<Typography variant="h5" className={classes.titleSeeMore} gutterBottom>
											{`Kết quả tìm kiếm cho từ khóa '${query}'`}
										</Typography>
									)}
									<AppBar position="static" className={classes.appBar}>
										<AntTabs
											value={sortValue}
											indicatorColor="primary"
											textColor="primary"
											onChange={handleChangeSort}
											variant="scrollable"
											scrollButtons="auto"
										>
											{sortOptions.map((c) => (
												<AntTab key={c.label} label={c.label} />
											))}
										</AntTabs>
									</AppBar>
									<>{showListProducts(filterData)}</>
								</>
							) : (
								<Box mt="2rem" textAlign="center">
									<ImageSearchIcon color="disabled" fontSize="large" />
									<Typography variant="body1" className={classes.titleSeeMore} gutterBottom>
										Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn...
									</Typography>
								</Box>
							)}
						</>
					)}
				</Grid>
			</Grid>
		</MainLayout>
	)
}

export default ShopPage
