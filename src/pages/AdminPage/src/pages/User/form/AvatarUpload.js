import React, { createRef, useState } from 'react'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '144px',
		height: '144px',
		margin: 'auto',
		borderRadius: '50%',
		padding: '8px',
		border: '1px dashed #919eab52',
	},
	upload: {
		zIndex: 1,
		width: '100%',
		height: '100%',
		outline: 'none',
		display: 'flex',
		overflow: 'hidden',
		borderRadius: '50%',
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
	},
	uploadArea: {
		display: 'flex',
		position: 'absolute',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		color: '#637381',
		backgroundColor: '#f4f6f8',
		transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		width: '100%',
		height: '100%',
		'&:hover': { opacity: 0.72, cursor: 'pointer' },
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	hasImage: {
		opacity: 0,
		'&:hover': { opacity: 0.72 },
	},
}))

const AvatarUpload = ({ avatar, setAvatar }) => {
	const classes = useStyles()
	const [image, _setImage] = useState(avatar || null)
	const inputFileRef = createRef(null)

	const cleanup = () => {
		URL.revokeObjectURL(image)
		inputFileRef.current.value = null
	}

	const setImage = (newImage) => {
		if (image) {
			cleanup()
		}
		_setImage(newImage)
	}

	const handleOnChange = (event) => {
		setAvatar(event.target?.files?.[0])
		const newImage = event.target?.files?.[0]
		if (newImage) {
			setImage(URL.createObjectURL(newImage))
		}
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.upload}>
				<input
					ref={inputFileRef}
					accept="image/*"
					hidden
					id="avatar-image-upload"
					type="file"
					onChange={handleOnChange}
					style={{
						width: '100%',
						height: '100%',
					}}
				/>
				{image && <img src={image} alt={image} className={classes.image} />}
				<label
					htmlFor="avatar-image-upload"
					className={clsx(classes.uploadArea, image ? classes.hasImage : null)}
				>
					<AddAPhotoIcon />
					<span
						style={{
							paddingTop: '8px',
						}}
					>
						{image ? 'Cập nhật' : 'Tải lên'}
					</span>
				</label>
			</div>
		</div>
	)
}

export default AvatarUpload
