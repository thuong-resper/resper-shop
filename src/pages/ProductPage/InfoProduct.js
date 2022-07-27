import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import RemoveIcon from '@material-ui/icons/Remove'
import ShareIcon from '@material-ui/icons/Share'
import { Rating } from '@material-ui/lab'
import { Form } from 'antd'
import ProductPromotion from 'components/Products/ProductPromotions/ProductPromotion'
import ProductSpecification from 'components/Products/ProductSpecification/ProductSpecification'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { fVNDCurrency } from 'utils/formatNumber'

const styles = {
	wrapper: { backgroundColor: '#fff', borderRadius: '4px', marginBottom: '1.5rem' },
	flex: { display: 'flex' },
	flexSpaceB: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
	flexCenterV: { display: 'flex', alignItems: 'center', margin: '0.5rem 0' },
	flexColumn: { display: 'flex', flexDirection: 'column' },
	leftCol: { flex: 1, marginRight: '0.5em' },
	rightCol: { flex: 1, marginLeft: '0.5em' },
	singleCol: { marginTop: '0.5rem', marginBottom: '0.5rem' },
	inputField: {
		maxWidth: '3rem',
		textAlign: 'center',
		outline: 'none',
		fontSize: '16px',
		border: '1px solid rgba(0, 0, 0, 0.23)',
	},
	brandLink: { margin: '0 5px', textDecoration: 'none', fontSize: '12px' },
	brandDivider: { height: 15, width: 1, background: '#9e9e9e' },
	tab: { display: 'flex', flexDirection: 'column' },
	tabColor: { minWidth: 'unset', width: '6rem', height: '6rem' },
	quantity: { display: 'flex' },
	priceCompare: {
		textDecoration: 'line-through',
		color: '#9e9e9e',
		whiteSpace: 'nowrap',
		fontSize: 14,
		marginRight: '0.5rem',
	},
	ml5: { marginLeft: '0.5rem' },
}

export default function InfoProduct({ dataProductsId, actionAddToCart }) {
	const [form] = Form.useForm()
	const [quantity, setQuantity] = useState(1)
	const { enqueueSnackbar } = useSnackbar()

	const onFinish = (values) => {
		try {
			if (values) {
				const { _id, name, price, image, subs, category, priceCompare } = dataProductsId
				const dataCart = {
					product: {
						brand: subs[0].name,
						category: category.name,
						_id,
						name,
						price,
						priceCompare,
						image: image[0].url,
					},
					quantity: quantity,
				}
				actionAddToCart(dataCart)
			}
		} catch (error) {}
	}

	const rate = dataProductsId.rating / dataProductsId.numReviews

	const max = 5
	const handleChange = (e) => {
		const base = Math.abs(e.target.value)
		if (base >= max) {
			setQuantity(parseInt(max))
		} else {
			setQuantity(parseInt(base))
		}
	}

	return (
		<>
			<Box m="0 0.5rem">
				<Box>
					<Typography variant="h5">{dataProductsId.name}</Typography>
				</Box>
				<Box style={styles.flexSpaceB}>
					<Box component="fieldset" display="flex">
						<Rating name="read-only" value={rate} readOnly size="small" precision={0.5} />
						<Typography variant="body2" color="textSecondary">
							{dataProductsId.numReviews} đánh giá
						</Typography>
					</Box>
					<div>
						<IconButton aria-label="share" color="primary">
							<ShareIcon />
						</IconButton>
						<IconButton aria-label="favorite" color="primary">
							<FavoriteBorderIcon />
						</IconButton>
					</div>
				</Box>

				<Box style={styles.flexCenterV}>
					<span>Thương hiệu:</span>
					<Link to={`/s?subs=${dataProductsId.subs[0]._id}`} style={styles.brandLink}>
						{dataProductsId.subs[0].name}
					</Link>
					<span className={styles.brandDivider} />
				</Box>

				<Box>
					<Typography variant="h4" color="secondary">
						{dataProductsId.price ? fVNDCurrency(dataProductsId.price) : null}
					</Typography>
					<Typography variant="body2">
						<span>
							<span style={styles.priceCompare}>
								${dataProductsId.priceCompare ? fVNDCurrency(dataProductsId.priceCompare) : null}
							</span>
							<span>
								{(
									-(
										(dataProductsId.priceCompare - dataProductsId.price) /
										dataProductsId.priceCompare
									) * 100
								).toFixed() + '%'}
							</span>
						</span>
					</Typography>
				</Box>
				{/*promotions */}
				{dataProductsId.promotions ? <ProductPromotion product={dataProductsId} /> : null}

				{/*select quantity */}

				<Form form={form} onFinish={onFinish}>
					<Box m="0.5rem 0">
						<Grid container direction="row" alignItems="center">
							<Grid item xs={3}>
								<span>Số lượng</span>
							</Grid>
							<Grid item xs={9}>
								<Box style={styles.quantity}>
									<Button
										aria-label="reduce"
										onClick={() => {
											setQuantity(quantity === 1 ? 1 : quantity - 1)
										}}
										disabled={quantity === 1 || quantity === 0}
										style={styles.btnQty}
									>
										<RemoveIcon fontSize="small" />
									</Button>
									<input
										style={styles.inputField}
										value={quantity}
										type="text"
										onChange={(e) => {
											handleChange(e)
										}}
									/>
									<Button
										aria-label="increase"
										onClick={() => {
											setQuantity(quantity + 1)
										}}
										disabled={quantity === max}
										style={styles.btnQty}
									>
										<AddIcon fontSize="small" />
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Box>

					{/*product add to cart*/}
					<Box m="0.5rem 0">
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							onClick={() => {
								enqueueSnackbar('Thêm giỏ hàng thành công', { variant: 'success' })
							}}
							disabled={dataProductsId.countInStock === 0 || quantity === 0}
							fullWidth
							size="large"
						>
							Mua ngay
						</Button>
					</Box>
					{/* <Box height="2.5rem" m="0.5rem 0">
            <Button
              variant="contained"
              color="primary"
              disabled={dataProductsId.countInStock === 0 || quantity === 0}
              fullWidth
              size="large"
            >
              Trả góp qua thẻ tín dụng
            </Button>
          </Box> */}
				</Form>
				{/*product color*/}
				{/* {dataProductsId.colors ? <ProductColor product={dataProductsId} /> : null} */}
			</Box>
			<ProductSpecification product={dataProductsId} />
		</>
	)
}
