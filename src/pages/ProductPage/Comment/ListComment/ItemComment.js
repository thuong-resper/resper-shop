import { Avatar, Chip, IconButton, makeStyles, Typography } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { Rating } from '@material-ui/lab'
import clsx from 'clsx'
import moment from 'moment-timezone'
import 'moment/locale/vi'
import { useState } from 'react'
import FromEdit from './FromEdit'
import FromReply from './FromReply'

const useStyles = makeStyles((theme) => ({
	wrapper: {
		display: 'block',
		position: 'relative',
		margin: '0.5rem 0',
		padding: '10px 15px 0 12px',
		clear: 'both',
		fontSize: '14px',
		color: '#333',
		lineHeight: '24px',
		borderRadius: '8px',
		background: '#f8f8f8',
		border: '1px solid #dfdfdf',
	},
	d_flex: { display: 'flex', alignItems: 'center' },
	item: { marginRight: 8 },
	itemRight: { position: 'absolute', right: '1rem' },
	smallAv: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	chipHeight: { height: '1rem' },
	rating: { marginRight: '4px' },
	menuList: { padding: 0 },
	itemList: {},
	paragraph: {
		display: 'block',
		overflow: 'hidden',
		marginBottom: '8px',
		clear: 'both',
	},
	fitContent: { width: 'fit-content' },
}))

//
moment.locale('vi')
export default function ItemComment({
	item,
	token,
	socket,
	idUser,
	user,
	idProduct,
	actionCheckDeleteCmt,
	replyComment,
	setReplyComment,
	idComment,
	setIdComment,
	isForm,
	setIsForm,
	children,
}) {
	//
	const classes = useStyles()
	const [start, setStart] = useState(0)
	const [startOldEdit, setStartOldEdit] = useState(0)
	//
	const deleteComment = (_id) => {
		actionCheckDeleteCmt()
		socket.emit('userDeleteComment', {
			_id: _id,
			id_product: idProduct,
			token: token,
			idUser: idUser,
		})
	}
	const onEditComment = (id, start) => {
		setIdComment(id)
		setIsForm(true)
		setStartOldEdit(start)
		setStart(start)
		setReplyComment(false)
		setTimeout(() => {
			document.querySelector('#main_edit').scrollIntoView({ behavior: 'smooth', block: 'end' })
		}, 100)
	}
	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.d_flex}>
					<div className={classes.item}>
						<Avatar alt="Remy Sharp" src={item.avatar} className={classes.smallAv} />
					</div>
					<div className={classes.item}>
						<Typography variant="subtitle2">{item.name}</Typography>
					</div>
					<div className={classes.item}>
						{item.role === 1 && (
							<Chip
								color="primary"
								size="small"
								className={classes.chipHeight}
								label="Quản trị viên"
							/>
						)}
					</div>
					<div className={clsx(classes.item, classes.itemRight)}>
						{/* show icon delete and update edit comment */}
						{token && item.id_user === idUser && !(idComment === item._id && isForm) && (
							<>
								<IconButton
									aria-label="edit"
									size="small"
									color="primary"
									onClick={() => {
										onEditComment(item._id, item.start)
									}}
								>
									<EditIcon fontSize="inherit" />
								</IconButton>
								<IconButton
									aria-label="delete"
									size="small"
									color="secondary"
									onClick={() => {
										deleteComment(item._id)
									}}
								>
									<DeleteOutlineIcon fontSize="inherit" />
								</IconButton>
							</>
						)}
					</div>
				</div>

				{isForm && item._id === idComment && token ? (
					// if right show from edit comment
					<FromEdit
						item={item}
						startOldEdit={startOldEdit}
						start={start}
						setStart={setStart}
						token={token}
						idUser={idUser}
						socket={socket}
						idComment={idComment}
						idProduct={idProduct}
						setIsForm={setIsForm}
					/>
				) : (
					<>
						{item.start > 0 && (
							<div className={classes.d_flex}>
								<Rating
									name="half-rating-read"
									value={item.start}
									precision={0.5}
									emptyIcon={<StarBorderIcon fontSize="inherit" />}
									readOnly
									size="small"
									className={classes.rating}
								/>
								<Tooltip
									TransitionComponent={Zoom}
									title={moment(item.timeComment).format('LLLL')}
									arrow
								>
									<Typography variant="caption" display="block" className={classes.fitContent}>
										{moment(item.timeComment).fromNow()}
										{item.editComment && <span> (đã chỉnh sửa)</span>}
									</Typography>
								</Tooltip>
							</div>
						)}
						<p className={classes.paragraph}>{item.content}</p>
					</>
				)}
				{/* <FromReply /> */}
				<div className={classes.paragraph}>{children}</div>
				{idComment === item._id && replyComment && token && (
					<FromReply
						setReplyComment={setReplyComment}
						socket={socket}
						user={user}
						idUser={idUser}
						idProduct={idProduct}
						idComment={idComment}
						token={token}
					/>
				)}
			</div>
		</>
	)
}
