import { Image } from 'antd'
import { NextBtn, PreviousBtn } from 'components/Button/ButtonSlide/ButtonSlide'
import React from 'react'
import Slider from 'react-slick'
import './styles.css'

const ProductImageTab = ({ product }) => {
	const { image } = product
	console.log(image)

	const newImage = image.slice(1)
	const settings = {
		customPaging: function (i) {
			return <img src={newImage[i].url} alt={newImage[i].id} />
		},
		dots: true,
		dotsClass: 'group-array-image',
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		autoplaySpeed: 3000,
	}

	return (
		<>
			<Slider {...settings} prevArrow={<PreviousBtn />} nextArrow={<NextBtn />}>
				{newImage.map((image, index) => (
					<div className="image-array-slider" key={index}>
						<Image src={image.url} alt={image.id} />
					</div>
				))}
			</Slider>
		</>
	)
}

export default ProductImageTab
