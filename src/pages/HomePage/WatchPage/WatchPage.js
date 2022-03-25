import React from 'react'
import MainMenu from 'components/Navigation/MainMenu/MainMenu'
import ProductCollections from 'components/Products/ProductCollections/ProductCollections'
import ProductListTopTen from 'components/Products/ProductListTopTen/ProductListTopTen'
import ProductListMan from 'components/Products/ProductPremium/ProductListMan'
import ProductListWoman from 'components/Products/ProductPremium/ProductListWoman'
import ProductPremium from 'components/Products/ProductPremium/ProductPremium'
import WatchNews from 'components/WatchNews/WatchNews'
import Banner from '../../../components/Banner/Banner.js'
import ProductRoutes from '../../../components/Products/ProductKind/ProductRoutes'
import anh1 from 'images/anh1.png'
import anh2 from 'images/anh2.png'
import anh3 from 'images/anh3.png'
import anh4 from 'images/anh4.png'
import anh5 from 'images/anh5.png'
import imgX from 'images/anhx.png'
import imgY from 'images/anhy.png'

const dataBannerResult = [
	{
		banner: anh1,
	},
	{
		banner: anh2,
	},
	{
		banner: anh3,
	},
	{
		banner: anh4,
	},
	{
		banner: anh5,
	},
]

const WatchPage = (props) => {
	return (
		<div>
			<MainMenu />
			<Banner dataBannerResult={dataBannerResult} imgX={imgX} imgY={imgY} />
			<ProductCollections />
			<ProductListTopTen />
			<ProductRoutes />
			<ProductPremium />
			<ProductListMan />
			<ProductListWoman />
			<WatchNews />
		</div>
	)
}

export default WatchPage
