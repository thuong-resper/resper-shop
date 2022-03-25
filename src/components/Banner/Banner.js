import { Grid } from '@material-ui/core'
import { NextBtn, PreviousBtn } from 'components/Button/ButtonSlide/ButtonSlide'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import './styles.css'

export default function Banner({ dataBannerResult, imgX, imgY }) {
	const settings = {
		infinite: false,
		autoplay: false,
		autoplaySpeed: 3000,
		speed: 300,
		dots: true,
		slidesPerRow: 1,
		slidesToScroll: 1,
	}

	//prevent click when swipe
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

	const ShowBanner = (data) => {
		if (data.length > 0) {
			return (
				<Slider
					className="list-item-banner"
					{...settings}
					prevArrow={<PreviousBtn />}
					nextArrow={<NextBtn />}
					beforeChange={handleBeforeChange}
					afterChange={handleAfterChange}
				>
					{data.map((igBanner, index) => (
						<Link className="items-banner" key={index} to="#" onClickCapture={handleOnItemClick}>
							<img src={igBanner.banner} alt={igBanner._id} />
						</Link>
					))}
				</Slider>
			)
		}
	}
	return (
		<>
			<Grid container direction="row" wrap="nowrap">
				<div className="ground-banner">
					<div className="list-banner">{ShowBanner(dataBannerResult)}</div>
					<div className="list-banner-right">
						<Link className="items-banner" to="#">
							<img src={imgX} alt="banner-x" />
						</Link>
						<Link className="items-banner" to="#">
							<img src={imgY} alt="banner-y" />
						</Link>
					</div>
				</div>
			</Grid>
		</>
	)
}
