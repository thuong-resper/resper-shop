import Banner from 'components/Banner/Banner.js'
import ProductCollections from 'components/Products/ProductCollections/ProductCollections'
import ProductRoutes from 'components/Products/ProductKind/ProductRoutes'
import WatchNews from 'components/WatchNews/WatchNews'
import anh1 from 'images/anh1.png'
import anh2 from 'images/anh2.png'
import anh3 from 'images/anh3.png'
import anh4 from 'images/anh4.png'
import anh5 from 'images/anh5.png'
import imgX from 'images/anhx.png'
import imgY from 'images/anhy.png'
import React from 'react'
import { WatchPageCategory } from '../StaticParam.js'
import TopProducts from '../TopProducts.js'
import ManWatch from './WatchType/ManWatch.js'
import PremiumWatch from './WatchType/PremiumWatch.js'
import WomanWatch from './WatchType/WomanWatch.js'
import { MainLayout } from 'components/Layout'

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
		<MainLayout>
			<Banner dataBannerResult={dataBannerResult} imgX={imgX} imgY={imgY} />
			<ProductCollections />
			<TopProducts fetchedCategories={WatchPageCategory} limit={15} />
			<ProductRoutes />
			<PremiumWatch />
			<ManWatch />
			<WomanWatch />
			<WatchNews />
		</MainLayout>
	)
}

export default WatchPage
