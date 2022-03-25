import Slider from 'react-slick'
import { NextBtn, PreviousBtn } from '../Button/ButtonSlide/ButtonSlide.js'
import Product from '../Products/Product/Product.js'
import React, { useCallback, useState } from 'react'
import styles from './styles.module.css'

const settings = {
	infinite: false,
	autoplay: false,
	autoplaySpeed: 3000,
	speed: 300,
	dots: false,
	slidesToShow: 5,
	swipeToSlide: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
			},
		},
	],
}

const ProductsSlider = ({ data }) => {
	//prevent click action when swipe
	const [dragging, setDragging] = useState(false)
	const handleBeforeChange = useCallback(() => {
		setDragging(true)
	}, [setDragging])
	const handleAfterChange = useCallback(() => {
		setDragging(false)
	}, [setDragging])
	const handleOnItemClick = useCallback(
		(e) => {
			if (dragging) e.preventDefault()
		},
		[dragging]
	)
	return (
		<Slider
			{...settings}
			className={styles.list}
			prevArrow={<PreviousBtn />}
			nextArrow={<NextBtn />}
			beforeChange={handleBeforeChange}
			afterChange={handleAfterChange}
		>
			{data.map((item) => (
				<div onClickCapture={handleOnItemClick} key={item._id} className={styles.item}>
					<Product product={item} />
				</div>
			))}
		</Slider>
	)
}

export default ProductsSlider
