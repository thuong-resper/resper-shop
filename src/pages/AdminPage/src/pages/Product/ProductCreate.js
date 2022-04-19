import { Box, Container, Tab, Tabs, Typography } from '@material-ui/core'
import React from 'react'
import FormProductCreateLaptop from './ProductCreate/FormProductCreateLaptop'
import FormProductCreatePhone from './ProductCreate/FormProductCreatePhone'
import FormProductCreateSmWatch from './ProductCreate/FormProductCreateSmWatch'
import FormProductCreateTablet from './ProductCreate/FormProductCreateTablet'
import FormProductCreateWatch from './ProductCreate/FormProductCreateWatch'
import { AdminLayout } from 'components/Layout/index.js'
import SEO from 'components/SEO/SEO.js'
import Iconify from 'components/Iconify.js'

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	}
}

const TabItem = [
	{ icon: 'bi:phone', label: 'Điện thoại' },
	{ icon: 'ant-design:laptop-outlined', label: 'Laptop' },
	{ icon: 'clarity:tablet-line', label: 'Tablet' },
	{ icon: 'ion:watch-outline', label: 'Đồng hồ thông minh' },
	{ icon: 'ph:watch-light', label: 'Đồng hồ thời trang' },
]

const ProductCreate = () => {
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<AdminLayout>
			<SEO pageTitle={'Admin | Tạo mới sản phẩm'} />
			<Container>
				<Box padding="24px 16px">
					<Box padding="0 24px">
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							aria-label="scrollable auto tabs example"
						>
							{TabItem.map((item, index) => (
								<Tab
									key={index}
									label={
										<div>
											<Iconify
												icon={item.icon}
												width="1.5em"
												height="1.5em"
												color="inherit"
												style={{ verticalAlign: 'middle', marginRight: 8 }}
											/>
											{item.label}
										</div>
									}
									{...a11yProps(index)}
								/>
							))}
						</Tabs>
					</Box>

					<TabPanel value={value} index={0}>
						<FormProductCreatePhone />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<FormProductCreateLaptop />
					</TabPanel>
					<TabPanel value={value} index={2}>
						<FormProductCreateTablet />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<FormProductCreateSmWatch />
					</TabPanel>
					<TabPanel value={value} index={4}>
						<FormProductCreateWatch />
					</TabPanel>
				</Box>
			</Container>
		</AdminLayout>
	)
}

export default ProductCreate
