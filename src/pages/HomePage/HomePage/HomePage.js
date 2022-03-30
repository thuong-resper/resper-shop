import React from 'react'
import { Box } from '@material-ui/core'
import WatchNews from 'components/WatchNews/WatchNews'
import Banner from 'components/Banner/Banner.js'
import imgX from 'images/anhhome10.png'
import imgY from 'images/anhhome11.png'
import anh1 from 'images/anhhome1.png'
import anh2 from 'images/anhhome2.png'
import anh3 from 'images/anhhome3.png'
import anh4 from 'images/anhhome4.png'
import anh5 from 'images/anhhome5.png'
import anh6 from 'images/anhhome6.png'
import anh7 from 'images/anhhome7.png'
import { LaptopAndTablet, Phone, Watch } from '../StaticParam.js'
import TopProducts from '../TopProducts.js'
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
	{
		banner: anh6,
	},
	{
		banner: anh7,
	},
]

const HomePage = (props) => {
	return (
		<MainLayout>
			<Banner dataBannerResult={dataBannerResult} imgX={imgX} imgY={imgY} />
			<Box m="0.5rem 0">
				<TopProducts fetchedCategories={Phone} />
			</Box>
			<Box m="0.5rem 0">
				<TopProducts fetchedCategories={LaptopAndTablet} />
			</Box>
			<Box m="0.5rem 0">
				<TopProducts fetchedCategories={Watch} />
			</Box>
			<Box m="0.5rem 0">
				<WatchNews />
			</Box>
		</MainLayout>
	)
}
export default HomePage
