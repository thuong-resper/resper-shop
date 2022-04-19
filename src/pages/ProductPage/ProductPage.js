import { Grid, makeStyles } from '@material-ui/core'
import CustomizedBreadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ProductImageTab from 'components/Products/ProductImageTab/ProductImageTab'
import { addCartProduct } from 'features/Cart/CartSlice'
import queryString from 'query-string'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import ProductDescription from 'components/Products/ProductDescription/ProductDescription'
import Comment from './Comment'
import HistoryProduct from './HistoryProduct/HistoryProduct'
import InfoProduct from './InfoProduct'
import SeeMoreProduct from './SeeMoreProduct/SeeMoreProduct'
import { MainLayout } from 'components/Layout'
import { UserContext } from 'contexts/index.js'
import { useGetProductById, useGetRelatedProducts } from 'features/Product/index.js'
import SEO from 'components/SEO/SEO.js'
import { useGetCommentById } from 'features/Comment/index.js'

const useStyles = makeStyles((theme) => ({
	container: {
		borderTop: '1px solid #e0e0e0',
		paddingTop: '15px',
		overflow: 'hidden',
		backgroundColor: '#fff',
		clear: 'both',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
		},
	},
	block_left: {
		width: 'calc(100% - 490px)',
		float: 'left',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			float: 'none',
		},
	},
	block_right: {
		width: '460px',
		float: 'right',
		marginLeft: '30px',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			float: 'none',
			marginLeft: 'auto',
		},
	},
	breadcrumb: { backgroundColor: '#fff', borderRadius: '4px 4px 0 0', padding: '1rem 0' },
	wrapper: { backgroundColor: '#fff', borderRadius: '4px' },
	mb15: { marginBottom: '1.5rem' },
}))

const ProductPage = ({ location }) => {
	const classes = useStyles()
	const history = useHistory()
	const dispatch = useDispatch()
	const { id } = useParams()

	const state = useContext(UserContext)
	const { socket } = state
	const [user] = state.user
	const [token] = state.token
	const items = 10

	const page = Number(queryString.parse(location.search).page) || 1
	const page_cmt = Number(queryString.parse(location.search).page_cmt) || 1
	let historyProduct = JSON.parse(localStorage.getItem('history_product')) || []

	const [, setDataProductsId] = useState(null)
	const [lengthComment, setLengthComment] = useState(null)
	const [dataComment, setDataComment] = useState([])
	const [checkDeleteCmt, setCheckDeleteCmt] = useState(false)
	const [sumStarRating, setSumStarRating] = useState(0)
	const [starRating, setStarRating] = useState([])
	const [reviewRating, setReviewRating] = useState(0)
	const [loadingDeleteProduct] = useState(false)

	const { status, data, error, isFetching } = useGetProductById(id)

	const params = {
		limit: items,
		page: page,
		id: id,
	}
	const {
		status: statusRelated,
		data: dataRelated,
		error: errorRelated,
		isFetching: isFetchingRelated,
	} = useGetRelatedProducts(params)

	const paramsComment = {
		_id_product: id,
		page: page_cmt,
		limit: 5,
	}

	const {
		status: statusComment,
		data: dataCommentFetched,
		error: errorComment,
		isFetching: isFetchingComment,
	} = useGetCommentById(paramsComment)

	useEffect(() => {
		if (statusComment === 'success') {
			setDataComment(dataCommentFetched?.data)
			setLengthComment(dataCommentFetched?.length)
			setStarRating(dataCommentFetched?.starRating)
			setSumStarRating(dataCommentFetched?.sumStarRating)
			setReviewRating(dataCommentFetched?.reviewRating)
		}
	}, [statusComment, dataCommentFetched])

	const actionAddToCart = (cart) => dispatch(addCartProduct(cart))

	useEffect(() => {
		if (socket) {
			socket.emit('joinRoom', id)
		}
	}, [socket, id])

	useEffect(() => {
		if (socket) {
			socket.on('serverUserDeleteReplyComment', (msg) => {
				if (msg) {
					const { comment, id_array } = msg
					const newReply = [...dataComment]
					const index = newReply.findIndex((comment) => comment._id === id_array)
					if (index !== -1) {
						newReply[index] = comment
					}
					setCheckDeleteCmt(false)
					setDataComment(newReply)
				}
			})
			return () => socket.off('serverUserDeleteReplyComment')
		}
	}, [socket, dataComment])

	useEffect(() => {
		if (socket) {
			socket.on('ServerUserCreateCommentReply', (msg) => {
				if (msg) {
					const newReply = [...dataComment]
					const index = newReply.findIndex((comment) => comment._id === msg._id)
					if (index !== -1) {
						newReply[index] = msg
					}
					setDataComment(newReply)
				}
			})
			return () => socket.off('ServerUserCreateCommentReply')
		}
	}, [socket, dataComment])

	useEffect(() => {
		if (socket) {
			socket.on('serverUserUpdateReplyComment', (msg) => {
				if (msg) {
					const newReply = [...dataComment]
					const index = newReply.findIndex((comment) => comment._id === msg._id)
					if (index !== -1) {
						newReply[index] = msg
					}
					setDataComment(newReply)
				}
			})
			return () => socket.off('serverUserUpdateReplyComment')
		}
	}, [socket, dataComment])

	useEffect(() => {
		if (socket) {
			socket.on('ServerUserCreateComment', (msg) => {
				document.getElementById('waitWriteComment').innerHTML = ''
				const { comment, length, product, starRating, sumStarRating, reviewRating } = msg
				if (msg) {
					setStarRating(starRating)
					setSumStarRating(sumStarRating)
					setReviewRating(reviewRating)
					setLengthComment(length)
					setDataComment([comment, ...dataComment])
					setCheckDeleteCmt(false)
					setDataProductsId(product)
				}
			})
			return () => socket.off('ServerUserCreateComment')
		}
	}, [socket, dataComment])

	useEffect(() => {
		if (socket) {
			socket.on('serverUserDeleteComment', (msg) => {
				const { comment, length, product, starRating, sumStarRating, reviewRating } = msg
				if (msg) {
					const dataCommentNew = [...dataComment]
					const index = dataCommentNew.findIndex((cmt) => cmt._id === comment._id)
					dataCommentNew.splice(index, 1)
					setLengthComment(length)
					setDataComment(dataCommentNew)
					setCheckDeleteCmt(false)
					setDataProductsId(product)
					setStarRating(starRating)
					setSumStarRating(sumStarRating)
					setReviewRating(reviewRating)
				}
			})
			return () => socket.off('serverUserDeleteComment')
		}
	}, [socket, dataComment])

	useEffect(() => {
		if (socket) {
			socket.on('serverUserUpdateComment', (msg) => {
				const { comment, product, starRating, sumStarRating, reviewRating } = msg
				if (msg) {
					const dataCommentNew = [...dataComment]
					const index = dataCommentNew.findIndex((cmt) => cmt._id === comment._id)
					if (index !== -1) {
						dataCommentNew[index] = comment
					}
					setDataComment(dataCommentNew)
					setDataProductsId(product)
					setStarRating(starRating)
					setSumStarRating(sumStarRating)
					setReviewRating(reviewRating)
				}
			})
		}
		return () => socket.off('serverUserUpdateComment')
	}, [socket, dataComment])

	const showHistoryProduct = () => {
		const historyProductOld = [...historyProduct]
		historyProductOld.forEach((product, index) => {
			if (product === null || product._id === id) {
				historyProductOld.splice(index, 1)
			}
		})
		historyProductOld.unshift(data)
		localStorage.setItem('history_product', JSON.stringify(historyProductOld))
	}

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
		showHistoryProduct() // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	const onChangePageSeenMoreProduct = (_page) => {
		const data = {
			page: _page,
			page_cmt: page_cmt,
		}
		const params = queryString.stringify(data)
		const url = `/product/${id}?${params}`
		history.push(url)
	}
	const onChangePageComment = (_page) => {
		const data = {
			_id_product: id,
			page_cmt: page_cmt + 1,
			page: page,
		}
		const params = queryString.stringify(data)
		const url = `/product/${id}?${params}`
		history.push(url)
	}
	const actionCheckDeleteCmt = () => {
		setCheckDeleteCmt(true)
	}

	return (
		<MainLayout>
			{!id || status === 'loading' ? (
				<SimpleBackdrop />
			) : status === 'error' ? (
				<span>Error: {error.message}</span>
			) : (
				<>
					<SEO
						pageTitle={data?.name}
						image={data?.image[0].url}
						pageDescription={data?.description}
						pageUrl={`${process.env.REACT_APP_CLIENT_URL}/product/${data?._id}`}
					/>
					{isFetching ? <SimpleBackdrop /> : null}
					<Grid container direction="row">
						<Grid item xs={12} className={classes.breadcrumb}>
							<CustomizedBreadcrumbs step1="Home" step2={data?.category.name} infoProduct={data} />
						</Grid>
					</Grid>
					<div className={classes.container}>
						<div className={classes.block_left}>
							{data.image ? (
								<div className={classes.wrapper}>
									<ProductImageTab product={data} />
								</div>
							) : null}
						</div>
						<div className={classes.block_right}>
							<InfoProduct dataProductsId={data} actionAddToCart={actionAddToCart} />
						</div>
						<div className={classes.block_left}>
							<ProductDescription product={data} className={classes.wrapper} />
						</div>
						<div className={classes.block_left}>
							{statusComment === 'loading' ? (
								<div>Loading...</div>
							) : statusComment === 'error' ? (
								<span>Error: {errorComment.message}</span>
							) : (
								<>
									{isFetchingComment ? <SimpleBackdrop /> : null}
									<Comment
										infoProduct={data}
										lengthComment={lengthComment}
										dataComment={dataComment}
										onChangePageComment={onChangePageComment}
										socket={socket}
										token={token}
										user={user}
										actionCheckDeleteCmt={actionCheckDeleteCmt}
										sumStarRating={sumStarRating}
										starRating={starRating}
										nameProduct={data?.name}
										reviewRating={reviewRating}
									/>
								</>
							)}
						</div>
					</div>
					{statusRelated === 'loading' ? (
						<div>Loading...</div>
					) : statusRelated === 'error' ? (
						<span>Error: {errorRelated.message}</span>
					) : (
						<SeeMoreProduct
							items={items}
							dataRelated={dataRelated}
							onChangePage={onChangePageSeenMoreProduct}
							loading={isFetchingRelated}
							pageUrl={page}
						/>
					)}
					<HistoryProduct historyProduct={historyProduct} _id={id} />
				</>
			)}

			{checkDeleteCmt && <SimpleBackdrop />}
			{loadingDeleteProduct && <SimpleBackdrop />}
		</MainLayout>
	)
}

export default ProductPage
