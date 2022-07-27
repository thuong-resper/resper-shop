import { Button, makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import AlertDialogSlide from 'components/UI/Modal/CustomModal'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'relative',
		marginBottom: '20px',
		margin: 'auto',
		padding: '20px 0',
		maxWidth: '750px',
	},
	wrapperDialog: {
		position: 'relative',
		marginBottom: '20px',
		margin: 'auto',
		padding: '20px 0',
		maxWidth: '685px',
	},
	content: { height: '450px', overflow: 'hidden', transition: '.3s' },
	bgContent: {
		background:
			'linear-gradient(to bottom,rgba(255 255 255/0),rgba(255 255 255/62.5),rgba(255 255 255/1))',
		bottom: '15px',
		height: '105px',
		left: '0',
		position: 'absolute',
		width: '100%',
	},
	btnShowContent: {
		position: 'relative',
		display: 'block',
		margin: 'auto',
	},
}))

const ProductDescription = ({ product }) => {
	const classes = useStyles()

	return (
		<Box m="0.5rem">
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<Typography variant="h6">Mô tả sản phẩm</Typography>
					{product?.description ? <div>{ReactHtmlParser(product?.description)}</div> : <p>...</p>}
				</div>
				<div className={classes.bgContent}></div>
				<AlertDialogSlide
					title="Mô tả sản phẩm"
					component={
						<div className={classes.wrapperDialog}>
							<div>
								{product?.description ? (
									<div>{ReactHtmlParser(product?.description)}</div>
								) : (
									<p>...</p>
								)}
							</div>
						</div>
					}
					disagreeButton={false}
					fullScreen
				>
					<Button
						variant="outlined"
						color="primary"
						size="small"
						className={classes.btnShowContent}
					>
						Xem thêm
					</Button>
				</AlertDialogSlide>
			</div>
		</Box>
	)
}

export default ProductDescription
