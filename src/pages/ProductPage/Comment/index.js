import FormWrite from './FormWrite/index'
import ListComment from './ListComment/index'
import StarRatingUser from './StarRatingUser/index'

export default function Comment({
	dataComment,
	infoProduct,
	lengthComment,
	onChangePageComment,
	socket,
	token,
	user,
	actionCheckDeleteCmt,
	starRating,
	sumStarRating,
	nameProduct,
	reviewRating,
}) {
	return (
		<div className="group-comment">
			<div className="container-comment">
				<FormWrite infoProduct={infoProduct} token={token} user={user} socket={socket} />
				{sumStarRating > 0 && reviewRating > 0 && (
					<StarRatingUser
						reviewRating={reviewRating}
						nameProduct={nameProduct}
						sumStarRating={sumStarRating}
						starRating={starRating}
					/>
				)}
				<ListComment
					onChangePageComment={onChangePageComment}
					dataComment={dataComment}
					lengthComment={lengthComment}
					token={token}
					id_user={user && user._id}
					idProduct={infoProduct._id}
					socket={socket}
					actionCheckDeleteCmt={actionCheckDeleteCmt}
					user={user}
				/>
			</div>
		</div>
	)
}
